import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ChatOverlayService} from '@shared/services/chat-overlay-service';
import {ChatWebsocketService} from '@shared/services/chat-websocket-service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ScrollPanelModule
  ],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css'
})
export class ChatWidget implements OnInit {
  readonly overlayService = inject(ChatOverlayService);
  readonly chatService = inject(ChatWebsocketService);

  readonly isOpen = this.overlayService.isOpen;
  readonly messages = this.chatService.messages;
  readonly connected = this.chatService.connected;
  readonly title = computed(() => this.connected() ? 'Chat en ligne' : 'Connexion...');

  draft = signal('');

  ngOnInit(): void {
    this.chatService.connect();
  }

  close(): void {
    this.overlayService.close();
  }

  send(): void {
    const value = this.draft();
    if (!value.trim()) {
      return;
    }

    this.chatService.send(value);
    this.draft.set('');
  }

  updateDraft(value: string): void {
    this.draft.set(value);
  }

  trackByMessageId(index: number, message: { id: string }): string {
    return message.id;
  }
}
