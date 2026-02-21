import { Component, OnInit, OnDestroy, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HomeClientService, ProgramClientResponse } from '../trainers/services/home-client.service';
import { AuthService } from '../../core/services/auth.service';
import { TrainerCard } from '../../core/models/trainer.model';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit, OnDestroy {
  private homeClientService = inject(HomeClientService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Expose the current user
  currentUser = this.authService.currentUser;
  isAuthenticated = this.authService.isAuthenticated;

  mobileMenuOpen = signal(false);
  navScrolled = signal(false);
  featuredTrainers = signal<TrainerCard[]>([]);
  isLoadingTrainers = signal(true);
  popularPrograms = signal<ProgramClientResponse[]>([]);
  isLoadingPrograms = signal(true);
  currentImageIndex = signal(0);

  heroImages = [
    '/images/hero/1.jpg',
    '/images/hero/2.jpg',
    '/images/hero/3.jpg',
    '/images/hero/4.jpg',
    '/images/hero/5.jpg',
  ];

  currentImage = computed(() => this.heroImages[this.currentImageIndex()]);
  Math = Math;

  testimonials = [
    {
      id: 1,
      text: "Gymunity transformed my fitness journey! The trainers are incredibly knowledgeable and supportive. I lost 20 pounds in just 3 months!",
      author: "Sarah Johnson",
      role: "Fitness Enthusiast",
    },
    {
      id: 2,
      text: "Finally found a platform that offers quality training programs at reasonable prices. The personalized approach made all the difference.",
      author: "Ahmed Hassan",
      role: "Marathon Runner",
    },
    {
      id: 3,
      text: "Best investment in my health! The community is supportive and the trainers keep you accountable. Highly recommended!",
      author: "Maria Garcia",
      role: "Wellness Coach",
    },
  ];

  private carouselTimer: ReturnType<typeof setInterval> | null = null;
  private scrollHandler = () => this.navScrolled.set(window.scrollY > 20);

  ngOnInit() {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    this.loadFeaturedTrainers();
    this.loadPopularPrograms();
    this.carouselTimer = setInterval(() => {
      this.currentImageIndex.update(i => (i + 1) % this.heroImages.length);
    }, 5000);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
    if (this.carouselTimer) clearInterval(this.carouselTimer);
  }

  getUserInitials(): string {
    const user = this.currentUser();
    if (!user) return '?';
    const name = user.name || user.userName || '';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }

  loadFeaturedTrainers() {
    this.isLoadingTrainers.set(true);
    this.homeClientService.getAllTrainers().subscribe({
      next: (response) => {
        const trainers = (response || []) as unknown as TrainerCard[];
        this.featuredTrainers.set(trainers.length > 0 ? trainers.slice(0, 6) : this.getDemoTrainers());
        this.isLoadingTrainers.set(false);
      },
      error: () => {
        this.featuredTrainers.set(this.getDemoTrainers());
        this.isLoadingTrainers.set(false);
      },
    });
  }

  getDemoTrainers(): TrainerCard[] {
    return [
      { id: 1, userId: '1', userName: 'Alex Johnson', handle: 'alexjohnson', coverImageUrl: 'https://images.unsplash.com/photo-1567721913486-5f3c4dd8357f?w=400&h=400&fit=crop', bio: 'Certified fitness coach with 8 years of experience in strength training', isVerified: true, ratingAverage: 4.8, totalClients: 95, yearsExperience: 8, totalReviews: 45, startingPrice: 50, hasActiveSubscription: true },
      { id: 2, userId: '2', userName: 'Maria Garcia', handle: 'mariagarcia', coverImageUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=400&fit=crop', bio: 'Yoga and flexibility specialist helping clients achieve balance and wellness', isVerified: true, ratingAverage: 4.9, totalClients: 120, yearsExperience: 10, totalReviews: 67, startingPrice: 45, hasActiveSubscription: true },
      { id: 3, userId: '3', userName: 'David Chen', handle: 'davidchen', coverImageUrl: 'https://images.unsplash.com/photo-1574156519202-18a6cacfe814?w=400&h=400&fit=crop', bio: 'Marathon coach and cardio expert with proven track record of results', isVerified: true, ratingAverage: 4.7, totalClients: 110, yearsExperience: 9, totalReviews: 52, startingPrice: 55, hasActiveSubscription: true },
      { id: 4, userId: '4', userName: 'Sarah Williams', handle: 'sarahwilliams', coverImageUrl: 'https://images.unsplash.com/photo-1517836357463-d25ddfcb3ef7?w=400&h=400&fit=crop', bio: 'Personal trainer specializing in functional fitness and HIIT training', isVerified: true, ratingAverage: 4.8, totalClients: 85, yearsExperience: 7, totalReviews: 41, startingPrice: 60, hasActiveSubscription: true },
      { id: 5, userId: '5', userName: 'James Wilson', handle: 'jameswilson', coverImageUrl: 'https://images.unsplash.com/photo-1570829034853-aae4b8ff8f13?w=400&h=400&fit=crop', bio: 'Nutritionist and fitness coach combining diet and exercise for optimal results', isVerified: true, ratingAverage: 4.9, totalClients: 150, yearsExperience: 12, totalReviews: 78, startingPrice: 65, hasActiveSubscription: true },
      { id: 6, userId: '6', userName: 'Emma Thompson', handle: 'emmathompson', coverImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', bio: 'Pilates and core strength specialist for all fitness levels', isVerified: false, ratingAverage: 4.6, totalClients: 92, yearsExperience: 6, totalReviews: 39, startingPrice: 48, hasActiveSubscription: true },
    ];
  }

  loadPopularPrograms() {
    this.isLoadingPrograms.set(true);
    this.homeClientService.getAllPrograms().subscribe({
      next: (programs) => {
        this.popularPrograms.set(
          programs?.length > 0
            ? programs.sort((a, b) => (a.title || '').localeCompare(b.title || '')).slice(0, 6)
            : []
        );
        this.isLoadingPrograms.set(false);
      },
      error: () => {
        this.popularPrograms.set([]);
        this.isLoadingPrograms.set(false);
      },
    });
  }

  viewProgram(programId: number) {
    this.router.navigate(['/discover/packages', programId]);
  }

  viewTrainerProfile(trainer: TrainerCard) {
    this.router.navigate(['/discover/trainers', trainer.userId], { state: { trainer } });
  }

  navigateToPrograms() {
    this.router.navigate(['/discover/programs']);
  }

  getTrainerPhotoUrl(trainer: TrainerCard): string {
    return trainer.coverImageUrl || '';
  }

  getVisibleStatsCount(trainer: TrainerCard): number {
    let count = 0;
    if (trainer.yearsExperience) count++;
    if (trainer.totalClients) count++;
    if (trainer.ratingAverage) count++;
    return Math.max(count, 1);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.closeMobileMenu();
    this.router.navigate(['/auth/login']);
  }
}