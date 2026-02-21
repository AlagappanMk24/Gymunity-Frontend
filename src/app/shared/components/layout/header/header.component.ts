import { Component, OnInit, inject, signal, computed, DestroyRef, HostListener, effect, output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  toggleSidebar = output<void>();

  currentUser = this.authService.currentUser;
  
  showMobileMenu = signal(false);
  showDesktopDropdown = signal(false);
  showMobileDropdown = signal(false);
  showNotificationDropdown = signal(false);
  showMessagesDropdown = signal(false);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Close notification dropdown if clicking outside of it
    if (!target.closest('button[aria-label="notifications"]') && !target.closest('.notification-dropdown')) {
      if (this.showNotificationDropdown()) {
        this.closeNotificationDropdown();
      }
    }
    // Close messages dropdown if clicking outside of it
    if (!target.closest('button[aria-label="messages"]') && !target.closest('.messages-dropdown')) {
      if (this.showMessagesDropdown()) {
        this.closeMessagesDropdown();
      }
    }
  }

  getUserInitial(): string {
    const name = this.currentUser()?.name || 'U';
    return name.charAt(0).toUpperCase();
  }

  toggleMobileMenu() {
    this.showMobileMenu.update(val => !val);
  }

  toggleDesktopDropdown() {
    this.showDesktopDropdown.update(val => !val);
    this.showMobileDropdown.set(false);
  }

  toggleMobileDropdown() {
    this.showMobileDropdown.update(val => !val);
    this.showDesktopDropdown.set(false);
  }

  closeDropdowns() {
    this.showDesktopDropdown.set(false);
    this.showMobileDropdown.set(false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  goToNotifications() {
    this.router.navigate(['/chat']);
  }


  getRelativeTime(date: Date | string | undefined): string {
    if (!date) return 'Just now';
    
    const notificationDate = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - notificationDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return notificationDate.toLocaleDateString();
  }

  closeNotificationDropdown() {
    this.showNotificationDropdown.set(false);
  }

  closeMessagesDropdown() {
    this.showMessagesDropdown.set(false);
  }

  goToChat() {
    this.router.navigate(['/chat']);
  }

  navigateToChat(thread: any) {
    // Close the dropdown
    this.closeNotificationDropdown();
    // Navigate to chat
    this.router.navigate(['/chat']);
  }

  /**
   * Initialize notification sound using Web Audio API
   * Creates a simple beep sound programmatically
   */
  private initializeNotificationSound(): void {
    try {
      // Try to create audio context for playing sounds
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      let audioContext: any = null;
      
      const playNotificationSound = () => {
        try {
          // Create audio context if not already created
          if (!audioContext) {
            audioContext = new AudioContextClass();
          }
          
          if (audioContext.state === 'suspended') {
            audioContext.resume();
          }
          
          const now = audioContext.currentTime;
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          // Create a pleasant notification sound (two-tone)
          oscillator.frequency.setValueAtTime(800, now);
          oscillator.frequency.setValueAtTime(1200, now + 0.1);
          
          gainNode.gain.setValueAtTime(0.3, now);
          gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
          
          oscillator.start(now);
          oscillator.stop(now + 0.3);
          
          console.log('🔊 Notification sound played successfully');
        } catch (error) {
          console.log('Audio context error:', error);
        }
      };
      
      (window as any).playNotificationSound = playNotificationSound;
      console.log('✅ Notification sound initialized');
    } catch (error) {
      console.log('Web Audio API not available, notification sound disabled');
    }
  }

  /**
   * Play notification sound when new notification arrives
   */
  private playNotificationSound(): void {
    try {
      if ((window as any).playNotificationSound) {
        (window as any).playNotificationSound();
      }
      console.log('🔊 Notification sound played');
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  }

  /**
   * Override the unreadNotificationCount effect to trigger sound on new notifications
   */
}
