import {Injectable, signal} from '@angular/core';

export interface ChatMessage {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  self?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatWebsocketService {
  readonly messages = signal<ChatMessage[]>([]);
  readonly connected = signal(false);

  private socket: WebSocket | null = null;
  private readonly wsUrl = 'ws://localhost:8081/chat';

  connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }

    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => {
      this.connected.set(true);
    };

    this.socket.onmessage = (event: MessageEvent<string>) => {
      try {
        const data = JSON.parse(event.data) as ChatMessage;

        this.messages.update((currentMessages) => [
          ...currentMessages,
          data
        ]);
      } catch {
        this.messages.update((currentMessages) => [
          ...currentMessages,
          {
            id: crypto.randomUUID(),
            author: 'system',
            content: event.data,
            createdAt: new Date().toISOString(),
            self: false
          }
        ]);
      }
    };

    this.socket.onclose = () => {
      this.connected.set(false);
      this.socket = null;
    };

    this.socket.onerror = () => {
      this.connected.set(false);
    };
  }

  disconnect(): void {
    this.socket?.close();
    this.socket = null;
    this.connected.set(false);
  }

  send(content: string): void {
    const trimmedContent = content.trim();
    if (!trimmedContent || !this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return;
    }

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      author: 'Moi',
      content: trimmedContent,
      createdAt: new Date().toISOString(),
      self: true
    };

    this.socket.send(JSON.stringify(message));
    this.messages.update((currentMessages) => [...currentMessages, message]);
  }
}
