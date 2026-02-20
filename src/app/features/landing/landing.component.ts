// import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { HomeClientService, ProgramClientResponse } from '../trainers/services/home-client.service';
// import { AuthService } from '../../core/services/auth.service';
// import { TrainerCard } from '../../core/models/trainer.model';

// @Component({
//   selector: 'app-landing',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   template: `
//     <!-- Professional Navigation Bar -->
//     <nav class="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
//       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div class="flex justify-between items-center h-16">
//           <!-- Logo/Brand -->
//           <div class="flex items-center gap-3 flex-shrink-0 cursor-pointer" (click)="scrollToTop()">
//             <div class="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
//               <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//               </svg>
//             </div>
//             <span class="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">Gymunity</span>
//           </div>

//           <!-- Desktop Navigation Links -->
//           <div class="hidden md:flex items-center gap-8">
//             <a [routerLink]="['/discover/trainers']" class="text-gray-700 hover:text-sky-600 font-medium transition">Trainers</a>
//             <a [routerLink]="['/discover/programs']" class="text-gray-700 hover:text-sky-600 font-medium transition">Programs</a>
//             <a href="#" class="text-gray-700 hover:text-sky-600 font-medium transition">About</a>
//             <a href="#" class="text-gray-700 hover:text-sky-600 font-medium transition">Contact</a>
//           </div>

//           <!-- Desktop Auth Buttons -->
//           <div class="hidden md:flex items-center gap-4">
//             @if (isAuthenticated()) {
//               <button
//                 [routerLink]="['/dashboard']"
//                 class="text-sky-600 hover:text-sky-700 font-medium transition">
//                 Dashboard
//               </button>
//               <button
//                 [routerLink]="['/profile']"
//                 class="text-gray-700 hover:text-sky-600 font-medium transition">
//                 Profile
//               </button>
//               <button
//                 (click)="logout()"
//                 class="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-6 rounded-lg transition">
//                 Logout
//               </button>
//             } @else {
//               <button
//                 [routerLink]="['/auth/login']"
//                 class="text-sky-600 hover:text-sky-700 font-medium transition">
//                 Sign In
//               </button>
//               <button
//                 [routerLink]="['/auth/register']"
//                 class="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-6 rounded-lg transition">
//                 Get Started
//               </button>
//             }
//           </div>

//           <!-- Mobile Menu Button -->
//           <button
//             (click)="toggleMobileMenu()"
//             class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//             [attr.aria-label]="mobileMenuOpen() ? 'Close menu' : 'Open menu'">
//             @if (!mobileMenuOpen()) {
//               <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
//               </svg>
//             } @else {
//               <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             }
//           </button>
//         </div>

//         <!-- Mobile Menu -->
//         @if (mobileMenuOpen()) {
//           <div class="md:hidden bg-white border-t border-gray-200">
//             <div class="px-2 pt-2 pb-4 space-y-1">
//               <a [routerLink]="['/discover/trainers']" (click)="closeMobileMenu()" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">Trainers</a>
//               <a [routerLink]="['/discover/programs']" (click)="closeMobileMenu()" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">Programs</a>
//               <a href="#" (click)="closeMobileMenu()" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">About</a>
//               <a href="#" (click)="closeMobileMenu()" class="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">Contact</a>
//               <div class="border-t border-gray-200 pt-4 mt-4 space-y-2">
//                 @if (isAuthenticated()) {
//                   <button
//                     [routerLink]="['/dashboard']"
//                     (click)="closeMobileMenu()"
//                     class="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">
//                     Dashboard
//                   </button>
//                   <button
//                     [routerLink]="['/profile']"
//                     (click)="closeMobileMenu()"
//                     class="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition font-medium">
//                     Profile
//                   </button>
//                   <button
//                     (click)="logout()"
//                     class="block w-full text-left px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition font-medium">
//                     Logout
//                   </button>
//                 } @else {
//                   <button
//                     [routerLink]="['/auth/login']"
//                     (click)="closeMobileMenu()"
//                     class="block w-full text-left px-3 py-2 text-sky-600 hover:bg-sky-50 rounded-lg transition font-medium">
//                     Sign In
//                   </button>
//                   <button
//                     [routerLink]="['/auth/register']"
//                     (click)="closeMobileMenu()"
//                     class="block w-full text-left px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition font-medium">
//                     Get Started
//                   </button>
//                 }
//               </div>
//             </div>
//           </div>
//         }
//       </div>
//     </nav>

//     <!-- Add padding-top to account for fixed navbar -->
//     <div class="pt-16"></div>

//     <!-- Hero Section -->
//     <section class="relative text-white py-20 px-4 overflow-hidden" style="height: auto; min-height: 600px;">
//       <!-- Background Image Carousel with Overlay -->
//       <div class="absolute inset-0 -z-10">
//         <!-- Fallback Gradient Background -->
//         <div 
//           class="absolute inset-0 bg-gradient-to-br from-sky-600 via-blue-500 to-indigo-800 transition-all duration-1000">
//         </div>
        
//         <!-- Background Image (will display when image exists) -->
//         <div 
//           class="absolute inset-0 transition-all duration-1000 bg-cover bg-center"
//           [style.backgroundImage]="currentImage() ? 'url(' + currentImage() + ')' : 'none'"
//           [style.opacity]="currentImage() ? '1' : '0'">
//         </div>
        
//         <!-- Dark Overlay -->
//         <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
//       </div>
      
//       <!-- Content -->
//       <div class="max-w-7xl mx-auto relative z-10">
//         <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <!-- Left Content -->
//           <div class="space-y-6 animate-fade-in">
//             <div class="inline-block bg-sky-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
//               <span class="text-sm font-semibold text-sky-100">Your Fitness Journey Starts Here</span>
//             </div>
            
//             <h1 class="text-5xl lg:text-6xl font-bold leading-tight">
//               Transform Your Body,
//               <span class="bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-cyan-200">
//                 Transform Your Life
//               </span>
//             </h1>
            
//             <p class="text-xl text-sky-100 leading-relaxed">
//               Connect with professional trainers and access personalized fitness programs designed specifically for your goals. Join thousands of members achieving extraordinary results.
//             </p>
            
//             <div class="flex flex-col sm:flex-row gap-4 pt-6">
//               @if (isAuthenticated()) {
//                 <button
//                   [routerLink]="['/discover/trainers']"
//                   class="bg-white text-sky-600 font-bold py-3 px-8 rounded-lg hover:bg-sky-50 transition transform hover:scale-105 shadow-lg">
//                   Explore Trainers
//                 </button>
//                 <button
//                   [routerLink]="['/discover/programs']"
//                   class="bg-sky-500/30 border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-500/50 transition">
//                   Browse Programs
//                 </button>
//               } @else {
//                 <button
//                   [routerLink]="['/auth/register']"
//                   class="bg-white text-sky-600 font-bold py-3 px-8 rounded-lg hover:bg-sky-50 transition transform hover:scale-105 shadow-lg">
//                   Get Started
//                 </button>
//                 <button
//                   [routerLink]="['/auth/login']"
//                   class="bg-sky-500/30 border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-sky-500/50 transition">
//                   Sign In
//                 </button>
//               }
//             </div>
            
//             <!-- Stats -->
//             <div class="grid grid-cols-3 gap-8 pt-12">
//               <div>
//                 <p class="text-3xl font-bold text-cyan-200">500+</p>
//                 <p class="text-sky-100">Expert Trainers</p>
//               </div>
//               <div>
//                 <p class="text-3xl font-bold text-cyan-200">1000+</p>
//                 <p class="text-sky-100">Programs</p>
//               </div>
//               <div>
//                 <p class="text-3xl font-bold text-cyan-200">50K+</p>
//                 <p class="text-sky-100">Active Members</p>
//               </div>
//             </div>
//           </div>
          
//           <!-- Right Section - Carousel Indicators - Hidden -->
//           <div class="hidden">
//             <!-- Carousel indicators -->
//             <div class="flex justify-center gap-2 flex-wrap max-w-xs">
//               @for (image of heroImages; track $index) {
//                 <button
//                   (click)="currentImageIndex.set($index)"
//                   [class.bg-white]="currentImageIndex() === $index"
//                   [class.bg-white/40]="currentImageIndex() !== $index"
//                   class="w-3 h-3 rounded-full transition-all duration-300 hover:scale-125"
//                   [attr.title]="'Image ' + ($index + 1)">
//                 </button>
//               }
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>

//     <!-- Featured Trainers Section -->
//     <section id="featured-trainers" class="py-20 px-4 bg-gray-50">
//       <div class="max-w-7xl mx-auto">
//         <!-- Section Header -->
//         <div class="text-center mb-16">
//           <h2 class="text-4xl font-bold text-gray-900 mb-4">Featured Trainers</h2>
//           <p class="text-lg text-gray-600 max-w-2xl mx-auto">
//             Meet our certified and experienced trainers dedicated to helping you achieve your fitness goals
//           </p>
//         </div>

//         <!-- Loading State -->
//         @if (isLoadingTrainers()) {
//           <div class="flex justify-center items-center py-20">
//             <div class="animate-spin rounded-full h-16 w-16 border-4 border-sky-600 border-t-transparent"></div>
//           </div>
//         } @else if (featuredTrainers().length === 0) {
//           <div class="text-center py-16 bg-white rounded-lg shadow">
//             <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292m0 0H7.465M4.5 15H21m-16.5-6h16.5"></path>
//             </svg>
//             <h3 class="text-2xl font-bold text-gray-900 mb-2">No trainers found</h3>
//             <p class="text-gray-600">Unable to load trainer information. Please refresh the page.</p>
//           </div>
//         } @else {
//           <!-- Professional Trainers Grid - Enhanced Layout -->
//           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//             @for (trainer of featuredTrainers(); track trainer.id) {
//               <article 
//                 class="group bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-sky-300 transition-all duration-300 cursor-pointer flex flex-col h-full"
//                 (click)="viewTrainerProfile(trainer)"
//               >
//                 <!-- Cover Image with Overlay -->
//                 <div class="relative h-48 bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 overflow-hidden">
//                   @if (getTrainerPhotoUrl(trainer)) {
//                     <img 
//                       [src]="getTrainerPhotoUrl(trainer)" 
//                       [alt]="trainer.userName || 'Trainer'"
//                       class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <!-- Dark overlay for better text contrast -->
//                     <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
//                   }
                  
//                   <!-- Verified Badge (Top Right) -->
//                   @if (trainer.isVerified) {
//                     <div class="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg font-semibold text-xs">
//                       <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                         <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
//                       </svg>
//                       Verified
//                     </div>
//                   }

//                   <!-- Active Badge (Top Left) -->
//                   @if (trainer.hasActiveSubscription) {
//                     <div class="absolute top-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
//                       Active
//                     </div>
//                   }
//                 </div>

//                 <!-- Content -->
//                 <div class="p-6 flex flex-col flex-1">
//                   <!-- Avatar & Name (Overlapping cover) -->
//                   <div class="flex items-start gap-4 -mt-14 mb-4">
//                     <div class="relative flex-shrink-0">
//                       <div class="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-xl overflow-hidden">
//                         @if (getTrainerPhotoUrl(trainer)) {
//                           <img 
//                             [src]="getTrainerPhotoUrl(trainer)" 
//                             [alt]="trainer.userName"
//                             class="w-full h-full object-cover"
//                           />
//                         } @else {
//                           <div class="w-full h-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
//                             {{ trainer.userName.charAt(0).toUpperCase() || 'T' }}
//                           </div>
//                         }
//                       </div>
//                       <!-- Online Status Indicator -->
//                       <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
//                     </div>
//                     <!-- Trainer Info -->
//                     <div class="flex-1 pt-10">
//                       <h3 class="text-lg font-bold text-gray-900 mb-0.5 group-hover:text-sky-600 transition-colors">
//                         {{ trainer.userName || 'Trainer' }}
//                       </h3>
//                       @if (trainer.handle) {
//                         <p class="text-xs text-sky-600 font-medium">{{ '@' + trainer.handle }}</p>
//                       }
//                     </div>
//                   </div>

//                   <!-- Bio -->
//                   @if (trainer.bio) {
//                     <p class="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed flex-grow">
//                       {{ trainer.bio }}
//                     </p>
//                   }

//                   <!-- Rating & Reviews -->
//                   @if (trainer.ratingAverage || trainer.totalReviews) {
//                     <div class="flex items-center gap-2 mb-4">
//                       <div class="flex items-center gap-0.5">
//                         @for (i of [1, 2, 3, 4, 5]; track i) {
//                           <svg 
//                             [class]="i <= Math.round(trainer.ratingAverage || 0) ? 'text-yellow-400' : 'text-gray-300'"
//                             class="w-4 h-4" 
//                             fill="currentColor" 
//                             viewBox="0 0 20 20"
//                           >
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//                           </svg>
//                         }
//                       </div>
//                       <span class="text-sm font-semibold text-gray-900">{{ (trainer.ratingAverage || 0).toFixed(1) }}</span>
//                       @if (trainer.totalReviews) {
//                         <span class="text-xs text-gray-500">({{ trainer.totalReviews }})</span>
//                       }
//                     </div>
//                   }

//                   <!-- Stats Grid -->
//                   <div class="grid gap-3 py-4 border-t border-b border-gray-200 mb-4" [ngClass]="'grid-cols-' + getVisibleStatsCount(trainer)">
//                     @if (trainer.yearsExperience) {
//                       <div class="text-center">
//                         <p class="text-lg font-bold text-gray-900">{{ trainer.yearsExperience }}</p>
//                         <p class="text-xs text-gray-600">Years</p>
//                       </div>
//                     }
//                     @if (trainer.totalClients) {
//                       <div class="text-center">
//                         <p class="text-lg font-bold text-gray-900">{{ trainer.totalClients }}</p>
//                         <p class="text-xs text-gray-600">Clients</p>
//                       </div>
//                     }
//                     @if (trainer.ratingAverage) {
//                       <div class="text-center">
//                         <p class="text-lg font-bold text-gray-900">{{ (trainer.ratingAverage || 0).toFixed(1) }}</p>
//                         <p class="text-xs text-gray-600">Rating</p>
//                       </div>
//                     }
//                   </div>

//                   <!-- Price & CTA -->
//                   <div class="flex flex-col gap-3 mt-auto">
//                     @if (trainer.startingPrice) {
//                       <div class="flex flex-col">
//                         <span class="text-xs text-gray-500">Starting at</span>
//                         <div class="flex items-baseline gap-1">
//                           <span class="text-2xl font-bold text-gray-900">\${{ trainer.startingPrice }}</span>
//                           <span class="text-sm text-gray-600">/session</span>
//                         </div>
//                       </div>
//                     }
                    
//                     <button
//                       (click)="viewTrainerProfile(trainer); $event.stopPropagation()"
//                       class="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
//                     >
//                       <span>View Profile</span>
//                       <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             }
//           </div>

//           <!-- View All Trainers Button -->
//           <div class="flex justify-center pt-8">
//             <button
//               [routerLink]="['/discover/trainers']"
//               class="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
//             >
//               <span>View All Trainers</span>
//               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//               </svg>
//             </button>
//           </div>

//           <style>
//             .line-clamp-2 {
//               display: -webkit-box;
//               -webkit-line-clamp: 2;
//               -webkit-box-orient: vertical;
//               overflow: hidden;
//             }
//           </style>
//         }
//       </div>
//     </section>

//     <!-- Why Choose Us Section -->
//     <section class="py-20 px-4 bg-white">
//       <div class="max-w-7xl mx-auto">
//         <div class="text-center mb-16">
//           <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Gymunity?</h2>
//           <p class="text-lg text-gray-600">Everything you need to succeed in your fitness journey</p>
//         </div>

//         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <!-- Feature 1 -->
//           <div class="text-center">
//             <div class="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg class="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//               </svg>
//             </div>
//             <h3 class="text-lg font-bold text-gray-900 mb-2">Affordable Pricing</h3>
//             <p class="text-gray-600">Flexible payment plans that fit your budget</p>
//           </div>

//           <!-- Feature 2 -->
//           <div class="text-center">
//             <div class="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg class="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//               </svg>
//             </div>
//             <h3 class="text-lg font-bold text-gray-900 mb-2">Verified Trainers</h3>
//             <p class="text-gray-600">All trainers are certified and experienced professionals</p>
//           </div>

//           <!-- Feature 3 -->
//           <div class="text-center">
//             <div class="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg class="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
//               </svg>
//             </div>
//             <h3 class="text-lg font-bold text-gray-900 mb-2">Personalized Programs</h3>
//             <p class="text-gray-600">Custom fitness plans tailored to your goals</p>
//           </div>

//           <!-- Feature 4 -->
//           <div class="text-center">
//             <div class="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg class="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//               </svg>
//             </div>
//             <h3 class="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
//             <p class="text-gray-600">Always available to help with your fitness journey</p>
//           </div>
//         </div>
//       </div>
//     </section>

//     <!-- Programs Showcase Section -->
//     <section class="py-20 px-4 bg-gray-50">
//       <div class="max-w-7xl mx-auto">
//         <!-- Section Header -->
//         <div class="text-center mb-16">
//           <h2 class="text-4xl font-bold text-gray-900 mb-4">Popular Programs</h2>
//           <p class="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover a variety of fitness programs designed for all experience levels and goals
//           </p>
//         </div>

//         <!-- Program Categories -->
//         @if (isLoadingPrograms()) {
//           <div class="flex justify-center items-center py-20">
//             <div class="animate-spin rounded-full h-12 w-12 border-4 border-sky-600 border-t-transparent"></div>
//           </div>
//         } @else if (popularPrograms().length > 0) {
//           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             @for (program of popularPrograms(); track program.id) {
//               <div 
//                 (click)="viewProgram(program.id)"
//                 class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer transform hover:scale-105">
//                 <div class="h-48 bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-6xl group-hover:scale-110 transition">
//                   @if (program.thumbnailUrl) {
//                     <img
//                       [src]="program.thumbnailUrl"
//                       [alt]="program.title || 'Program'"
//                       class="w-full h-full object-cover"
//                     />
//                   } @else {
//                     <span>ðŸ’ª</span>
//                   }
//                 </div>
//                 <div class="p-6">
//                   <h3 class="text-xl font-bold text-gray-900 mb-2">{{ program.title || 'Program' }}</h3>
//                   <p class="text-gray-600 mb-4 line-clamp-2">{{ program.description || 'Fitness program designed for you' }}</p>
                  
//                   <!-- Program Stats -->
//                   <div class="flex gap-4 mb-4 text-sm text-gray-600">
//                     @if (program.durationWeeks) {
//                       <span>⏱️ {{ program.durationWeeks }} weeks</span>
//                     }
//                     @if (program.type) {
//                       <span>🎯 {{ program.type }}</span>
//                     }
//                   </div>
//                 </div>
//               </div>
//             }
//           </div>
//         } @else {
//           <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//             <!-- Strength Training -->
//             <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer">
//               <div class="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-6xl group-hover:scale-110 transition transform">
//                 ðŸ‹ï¸
//               </div>
//               <div class="p-6">
//                 <h3 class="text-xl font-bold text-gray-900 mb-2">Strength Training</h3>
//                 <p class="text-gray-600 mb-4">Build muscle and increase your overall strength with our comprehensive programs</p>
//                 <button
//                   [routerLink]="['/discover/programs']"
//                   class="text-orange-600 font-semibold hover:text-orange-700 transition inline-flex items-center gap-2">
//                   Explore <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
//                 </button>
//               </div>
//             </div>

//             <!-- Cardio & Endurance -->
//             <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer">
//               <div class="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-6xl group-hover:scale-110 transition transform">
//                 ðŸƒ
//               </div>
//               <div class="p-6">
//                 <h3 class="text-xl font-bold text-gray-900 mb-2">Cardio & Endurance</h3>
//                 <p class="text-gray-600 mb-4">Improve your cardiovascular health and stamina with dynamic cardio workouts</p>
//                 <button
//                   [routerLink]="['/discover/programs']"
//                   class="text-blue-600 font-semibold hover:text-blue-700 transition inline-flex items-center gap-2">
//                   Explore <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
//                 </button>
//               </div>
//             </div>

//             <!-- Flexibility & Yoga -->
//             <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden group cursor-pointer">
//               <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-6xl group-hover:scale-110 transition transform">
//                 ðŸ§˜
//               </div>
//               <div class="p-6">
//                 <h3 class="text-xl font-bold text-gray-900 mb-2">Flexibility & Yoga</h3>
//                 <p class="text-gray-600 mb-4">Enhance flexibility, balance, and mental wellness through yoga and stretching</p>
//                 <button
//                   [routerLink]="['/discover/programs']"
//                   class="text-purple-600 font-semibold hover:text-purple-700 transition inline-flex items-center gap-2">
//                   Explore <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         }

//         <!-- CTA -->
//         <div class="text-center">
//           <button
//             [routerLink]="['/discover/programs']"
//             class="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition">
//             View All Programs
//             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//     </section>

//     <!-- Testimonials Section -->
//     <section class="py-20 px-4 bg-sky-50">
//       <div class="max-w-7xl mx-auto">
//         <div class="text-center mb-16">
//           <h2 class="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
//           <p class="text-lg text-gray-600">Join thousands of members who've transformed their fitness</p>
//         </div>

//         <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
//           @for (testimonial of testimonials; track testimonial.id) {
//             <div class="bg-white rounded-lg shadow-md p-8">
//               <!-- Rating -->
//               <div class="flex gap-1 mb-4">
//                 @for (i of [1, 2, 3, 4, 5]; track i) {
//                   <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 }
//               </div>

//               <!-- Review -->
//               <p class="text-gray-600 mb-6 italic">{{ testimonial.text }}</p>

//               <!-- Author -->
//               <div>
//                 <p class="font-bold text-gray-900">{{ testimonial.author }}</p>
//                 <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
//               </div>
//             </div>
//           }
//         </div>
//       </div>
//     </section>

//     <!-- CTA Section -->
//     <section class="py-20 px-4 bg-gradient-to-r from-sky-600 to-sky-800 text-white">
//       <div class="max-w-4xl mx-auto text-center">
//         <h2 class="text-4xl font-bold mb-6">Ready to Transform Your Fitness?</h2>
//         <p class="text-xl text-sky-100 mb-10">
//           Join Gymunity today and connect with expert trainers who are ready to help you achieve your goals.
//         </p>
//         <div class="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             [routerLink]="['/auth/register']"
//             class="bg-white text-sky-600 font-bold py-3 px-10 rounded-lg hover:bg-sky-50 transition transform hover:scale-105 shadow-lg">
//             Get Started
//           </button>
//           <button
//             [routerLink]="['/discover/trainers']"
//             class="bg-sky-500/30 border-2 border-white text-white font-bold py-3 px-10 rounded-lg hover:bg-sky-500/50 transition">
//             Browse Trainers
//           </button>
//         </div>
//       </div>
//     </section>

//   `,
//   styles: [`
//     @keyframes fade-in {
//       from {
//         opacity: 0;
//         transform: translateY(20px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }

//     :host ::ng-deep .animate-fade-in {
//       animation: fade-in 0.8s ease-out;
//     }
//   `]
// })
// export class LandingComponent implements OnInit {
//   private homeClientService = inject(HomeClientService);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   isAuthenticated = signal(false);
//   mobileMenuOpen = signal(false);
//   featuredTrainers = signal<TrainerCard[]>([]);
//   isLoadingTrainers = signal(true);
//   popularPrograms = signal<ProgramClientResponse[]>([]);
//   isLoadingPrograms = signal(true);
//   currentImageIndex = signal(0);
  
//   // Carousel images - using new images from public/images/hero
//   heroImages = [
//     '/images/hero/1.jpg',
//     '/images/hero/2.jpg',
//     '/images/hero/3.jpg',
//     '/images/hero/4.jpg',
//     '/images/hero/5.jpg'
//   ];
  
//   currentImage = computed(() => this.heroImages[this.currentImageIndex()]);
//   Math = Math;

//   testimonials = [
//     {
//       id: 1,
//       text: "Gymunity transformed my fitness journey! The trainers are incredibly knowledgeable and supportive. I lost 20 pounds in just 3 months!",
//       author: "Sarah Johnson",
//       role: "Fitness Enthusiast"
//     },
//     {
//       id: 2,
//       text: "Finally found a platform that offers quality training programs at reasonable prices. The personalized approach really made the difference.",
//       author: "Ahmed Hassan",
//       role: "Marathon Runner"
//     },
//     {
//       id: 3,
//       text: "Best investment in my health! The community is supportive and the trainers keep you accountable. Highly recommended!",
//       author: "Maria Garcia",
//       role: "Wellness Coach"
//     }
//   ];

//   ngOnInit() {
//     console.log('[LandingComponent] Initializing landing page');
//     this.isAuthenticated.set(this.authService.isAuthenticated());
//     console.log('[LandingComponent] User authenticated:', this.isAuthenticated());
//     // Always load trainers and programs, regardless of authentication status
//     this.loadFeaturedTrainers();
//     this.loadPopularPrograms();
    
//     // Start the image carousel - change image every 5 seconds
//     setInterval(() => {
//       this.currentImageIndex.update(index => (index + 1) % this.heroImages.length);
//     }, 5000);
//   }

//   loadFeaturedTrainers() {
//     this.isLoadingTrainers.set(true);
//     this.homeClientService.getAllTrainers()
//       .subscribe({
//         next: (response) => {
//           // Cast trainers to TrainerProfile and get top 6
//           const trainers = (response || []) as unknown as TrainerCard[];
//           if (trainers.length > 0) {
//             this.featuredTrainers.set(trainers.slice(0, 6));
//           } else {
//             this.loadDemoTrainers();
//           }
//           this.isLoadingTrainers.set(false);
//         },
//         error: (error) => {
//           console.log('[LandingComponent] Error loading trainers:', error);
//           // Show demo trainers on any error (API not available, 403, etc.)
//           this.loadDemoTrainers();
//           this.isLoadingTrainers.set(false);
//         }
//       });
//   }

//   loadDemoTrainers() {
//     // Demo trainers for unauthenticated users
//     const demoTrainers: TrainerCard[] = [
//       {
//         id: 1,
//         userId: '1',
//         userName: 'Alex Johnson',
//         handle: 'alexjohnson',
//         coverImageUrl: 'https://images.unsplash.com/photo-1567721913486-5f3c4dd8357f?w=400&h=400&fit=crop',
//         bio: 'Certified fitness coach with 8 years of experience in strength training',
//         isVerified: true,
//         ratingAverage: 4.8,
//         totalClients: 95,
//         yearsExperience: 8,
//         totalReviews: 45,
//         startingPrice: 50,
//         hasActiveSubscription: true
//       },
//       {
//         id: 2,
//         userId: '2',
//         userName: 'Maria Garcia',
//         handle: 'mariagarcia',
//         coverImageUrl: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=400&h=400&fit=crop',
//         bio: 'Yoga and flexibility specialist helping clients achieve balance and wellness',
//         isVerified: true,
//         ratingAverage: 4.9,
//         totalClients: 120,
//         yearsExperience: 10,
//         totalReviews: 67,
//         startingPrice: 45,
//         hasActiveSubscription: true
//       },
//       {
//         id: 3,
//         userId: '3',
//         userName: 'David Chen',
//         handle: 'davidchen',
//         coverImageUrl: 'https://images.unsplash.com/photo-1574156519202-18a6cacfe814?w=400&h=400&fit=crop',
//         bio: 'Marathon coach and cardio expert with proven track record',
//         isVerified: true,
//         ratingAverage: 4.7,
//         totalClients: 110,
//         yearsExperience: 9,
//         totalReviews: 52,
//         startingPrice: 55,
//         hasActiveSubscription: true
//       },
//       {
//         id: 4,
//         userId: '4',
//         userName: 'Sarah Williams',
//         handle: 'sarahwilliams',
//         coverImageUrl: 'https://images.unsplash.com/photo-1517836357463-d25ddfcb3ef7?w=400&h=400&fit=crop',
//         bio: 'Personal trainer specializing in functional fitness and HIIT training',
//         isVerified: true,
//         ratingAverage: 4.8,
//         totalClients: 85,
//         yearsExperience: 7,
//         totalReviews: 41,
//         startingPrice: 60,
//         hasActiveSubscription: true
//       },
//       {
//         id: 5,
//         userId: '5',
//         userName: 'James Wilson',
//         handle: 'jameswilson',
//         coverImageUrl: 'https://images.unsplash.com/photo-1570829034853-aae4b8ff8f13?w=400&h=400&fit=crop',
//         bio: 'Nutritionist and fitness coach combining diet and exercise for optimal results',
//         isVerified: true,
//         ratingAverage: 4.9,
//         totalClients: 150,
//         yearsExperience: 12,
//         totalReviews: 78,
//         startingPrice: 65,
//         hasActiveSubscription: true
//       },
//       {
//         id: 6,
//         userId: '6',
//         userName: 'Emma Thompson',
//         handle: 'emmathompson',
//         coverImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
//         bio: 'Pilates and core strength specialist for all fitness levels',
//         isVerified: false,
//         ratingAverage: 4.6,
//         totalClients: 92,
//         yearsExperience: 6,
//         totalReviews: 39,
//         startingPrice: 48,
//         hasActiveSubscription: true
//       }
//     ];
//     this.featuredTrainers.set(demoTrainers);
//   }

//   loadPopularPrograms() {
//     this.isLoadingPrograms.set(true);
//     this.homeClientService.getAllPrograms().subscribe({
//       next: (programs) => {
//         if (programs && programs.length > 0) {
//           // Take top 6 programs and sort by title for consistency
//           const sortedPrograms = programs
//             .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
//             .slice(0, 6);
//           this.popularPrograms.set(sortedPrograms);
//         } else {
//           // No programs returned, show empty state
//           this.popularPrograms.set([]);
//         }
//         this.isLoadingPrograms.set(false);
//       },
//       error: (error) => {
//         console.log('[LandingComponent] Error loading programs:', error);
//         // On any error (API not available, 403, etc.), show empty state
//         // This will trigger the category fallback cards
//         this.popularPrograms.set([]);
//         this.isLoadingPrograms.set(false);
//       }
//     });
//   }

//   viewProgram(programId: number) {
//     this.router.navigate(['/discover/packages', programId]);
//   }

//   viewTrainerProfile(trainer: TrainerCard) {
//     this.router.navigate(['/discover/trainers', trainer.userId], { 
//       state: { trainer } 
//     });
//   }

//   scrollToTrainers() {
//     // Scroll to trainers section for unauthenticated users
//     const element = document.querySelector('[id="featured-trainers"]');
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   }

//   scrollToTop() {
//     // Scroll to top of page
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   getTrainerPhotoUrl(trainer: TrainerCard): string {
//     return trainer.coverImageUrl || '';
//   }

//   getVisibleStatsCount(trainer: TrainerCard): number {
//     let count = 0;
//     if (trainer.yearsExperience) count++;
//     if (trainer.totalClients) count++;
//     if (trainer.ratingAverage) count++;
//     return Math.max(count, 1); // At least 1 to avoid grid errors
//   }

//   toggleMobileMenu(): void {
//     this.mobileMenuOpen.update(value => !value);
//   }

//   closeMobileMenu(): void {
//     this.mobileMenuOpen.set(false);
//   }

//   logout(): void {
//     this.authService.logout();
//     this.closeMobileMenu();
//     this.router.navigate(['/auth/login']);
//   }
// }

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
  template: `
    <!-- ═══════════════════════════════════════════════════════════════
         NAVIGATION
    ═══════════════════════════════════════════════════════════════ -->
    <nav class="gm-nav" [class.gm-nav--scrolled]="navScrolled()">
      <div class="gm-nav__inner">

        <!-- Brand -->
        <button class="gm-brand" (click)="scrollToTop()">
          <span class="gm-brand__icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </span>
          <span class="gm-brand__name">Gymunity</span>
        </button>

        <!-- Desktop Links -->
        <div class="gm-nav__links">
          <a [routerLink]="['/discover/trainers']" class="gm-nav__link">Trainers</a>
          <a [routerLink]="['/discover/programs']" class="gm-nav__link">Programs</a>
          <a href="#" class="gm-nav__link">About</a>
          <a href="#" class="gm-nav__link">Contact</a>
        </div>

        <!-- Auth Area -->
        <div class="gm-nav__auth">
          @if (currentUser()) {
            <!-- Logged-in User Display -->
            <div class="gm-user-badge">
              <div class="gm-user-badge__avatar">
                @if (currentUser()?.profilePhotoUrl) {
                  <img [src]="currentUser()?.profilePhotoUrl" [alt]="currentUser()?.name" class="gm-user-badge__img" />
                } @else {
                  <span class="gm-user-badge__initials">{{ getUserInitials() }}</span>
                }
                <span class="gm-user-badge__dot"></span>
              </div>
              <div class="gm-user-badge__info">
                <span class="gm-user-badge__greeting">Welcome back</span>
                <span class="gm-user-badge__name">{{ currentUser()?.name || currentUser()?.userName }}</span>
              </div>
            </div>
            <button [routerLink]="['/dashboard']" class="gm-btn gm-btn--ghost">Dashboard</button>
            <button (click)="logout()" class="gm-btn gm-btn--outline">Logout</button>
          } @else {
            <button [routerLink]="['/auth/login']" class="gm-btn gm-btn--ghost">Sign In</button>
            <button [routerLink]="['/auth/register']" class="gm-btn gm-btn--primary">Get Started</button>
          }
        </div>

        <!-- Mobile Toggle -->
        <button class="gm-nav__burger" (click)="toggleMobileMenu()" [attr.aria-label]="mobileMenuOpen() ? 'Close' : 'Menu'">
          <span class="gm-burger__bar" [class.gm-burger__bar--open-1]="mobileMenuOpen()"></span>
          <span class="gm-burger__bar" [class.gm-burger__bar--open-2]="mobileMenuOpen()"></span>
          <span class="gm-burger__bar" [class.gm-burger__bar--open-3]="mobileMenuOpen()"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="gm-mobile-menu" [class.gm-mobile-menu--open]="mobileMenuOpen()">
        <!-- If logged in, show user info in mobile -->
        @if (currentUser()) {
          <div class="gm-mobile-user">
            <div class="gm-mobile-user__avatar">
              @if (currentUser()?.profilePhotoUrl) {
                <img [src]="currentUser()?.profilePhotoUrl" [alt]="currentUser()?.name" />
              } @else {
                <span>{{ getUserInitials() }}</span>
              }
            </div>
            <div>
              <p class="gm-mobile-user__greeting">Signed in as</p>
              <p class="gm-mobile-user__name">{{ currentUser()?.name || currentUser()?.userName }}</p>
              <p class="gm-mobile-user__email">{{ currentUser()?.email }}</p>
            </div>
          </div>
        }
        <a [routerLink]="['/discover/trainers']" (click)="closeMobileMenu()" class="gm-mobile-link">Trainers</a>
        <a [routerLink]="['/discover/programs']" (click)="closeMobileMenu()" class="gm-mobile-link">Programs</a>
        <a href="#" (click)="closeMobileMenu()" class="gm-mobile-link">About</a>
        <a href="#" (click)="closeMobileMenu()" class="gm-mobile-link">Contact</a>
        <div class="gm-mobile-divider"></div>
        @if (currentUser()) {
          <button [routerLink]="['/dashboard']" (click)="closeMobileMenu()" class="gm-mobile-link">Dashboard</button>
          <button [routerLink]="['/profile']" (click)="closeMobileMenu()" class="gm-mobile-link">Profile</button>
          <button (click)="logout()" class="gm-mobile-link gm-mobile-link--danger">Logout</button>
        } @else {
          <button [routerLink]="['/auth/login']" (click)="closeMobileMenu()" class="gm-mobile-link">Sign In</button>
          <button [routerLink]="['/auth/register']" (click)="closeMobileMenu()" class="gm-mobile-cta">Get Started Free →</button>
        }
      </div>
    </nav>

    <!-- ═══════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════ -->
    <section class="gm-hero">
      <!-- Animated background -->
      <div class="gm-hero__bg">
        <div class="gm-hero__bg-img"
          [style.backgroundImage]="currentImage() ? 'url(' + currentImage() + ')' : 'none'">
        </div>
        <div class="gm-hero__gradient"></div>
        <div class="gm-hero__noise"></div>
        <!-- Floating orbs -->
        <div class="gm-orb gm-orb--1"></div>
        <div class="gm-orb gm-orb--2"></div>
        <div class="gm-orb gm-orb--3"></div>
      </div>

      <!-- Carousel progress bar -->
      <div class="gm-hero__progress">
        @for (img of heroImages; track $index) {
          <button
            class="gm-hero__pip"
            [class.gm-hero__pip--active]="currentImageIndex() === $index"
            (click)="currentImageIndex.set($index)">
          </button>
        }
      </div>

      <div class="gm-hero__content">

        <!-- Personalized greeting for logged-in users -->
        @if (currentUser()) {
          <div class="gm-hero__welcome-pill">
            <span class="gm-hero__welcome-dot"></span>
            Welcome back, {{ currentUser()?.name && currentUser()!.name!.split(' ')[0] || currentUser()?.userName }}! Ready to crush it?
          </div>
        } @else {
          <div class="gm-hero__badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Your Fitness Journey Starts Here
          </div>
        }

        <h1 class="gm-hero__headline">
          @if (currentUser()) {
            <span class="gm-hero__headline-sub">Continue your</span>
            Transform<br>
            <em class="gm-hero__accent">Your Life</em>
          } @else {
            Transform<br>Your Body,<br>
            <em class="gm-hero__accent">Transform Your Life</em>
          }
        </h1>

        <p class="gm-hero__sub">
          Connect with professional trainers and access personalized fitness programs
          designed specifically for your goals. Join <strong>50,000+</strong> members achieving extraordinary results.
        </p>

        <div class="gm-hero__actions">
          @if (currentUser()) {
            <button [routerLink]="['/discover/trainers']" class="gm-cta gm-cta--primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Explore Trainers
            </button>
            <button [routerLink]="['/dashboard']" class="gm-cta gm-cta--secondary">
              Go to Dashboard →
            </button>
          } @else {
            <button [routerLink]="['/auth/register']" class="gm-cta gm-cta--primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              Start For Free
            </button>
            <button [routerLink]="['/auth/login']" class="gm-cta gm-cta--secondary">
              Sign In →
            </button>
          }
        </div>

        <!-- Stats row -->
        <div class="gm-hero__stats">
          <div class="gm-stat">
            <span class="gm-stat__num">500+</span>
            <span class="gm-stat__label">Expert Trainers</span>
          </div>
          <div class="gm-stat__divider"></div>
          <div class="gm-stat">
            <span class="gm-stat__num">1,000+</span>
            <span class="gm-stat__label">Programs</span>
          </div>
          <div class="gm-stat__divider"></div>
          <div class="gm-stat">
            <span class="gm-stat__num">50K+</span>
            <span class="gm-stat__label">Active Members</span>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="gm-hero__scroll">
        <span>Scroll</span>
        <div class="gm-hero__scroll-line"></div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         FEATURED TRAINERS
    ═══════════════════════════════════════════════════════════════ -->
    <section class="gm-section gm-section--light" id="featured-trainers">
      <div class="gm-container">
        <div class="gm-section-head">
          <span class="gm-section-head__eyebrow">Our Experts</span>
          <h2 class="gm-section-head__title">Featured Trainers</h2>
          <p class="gm-section-head__desc">Certified professionals dedicated to your transformation</p>
        </div>

        @if (isLoadingTrainers()) {
          <div class="gm-loading">
            <div class="gm-spinner"></div>
            <span>Loading trainers…</span>
          </div>
        } @else {
          <div class="gm-trainers-grid">
            @for (trainer of featuredTrainers(); track trainer.id) {
              <article class="gm-trainer-card" (click)="viewTrainerProfile(trainer)">
                <!-- Cover -->
                <div class="gm-trainer-card__cover">
                  @if (getTrainerPhotoUrl(trainer)) {
                    <img [src]="getTrainerPhotoUrl(trainer)" [alt]="trainer.userName" class="gm-trainer-card__cover-img" />
                  }
                  <div class="gm-trainer-card__cover-overlay"></div>

                  @if (trainer.isVerified) {
                    <span class="gm-badge gm-badge--verified">
                      <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                      </svg>
                      Verified
                    </span>
                  }
                  @if (trainer.hasActiveSubscription) {
                    <span class="gm-badge gm-badge--active">● Active</span>
                  }

                  <!-- Price overlay -->
                  @if (trainer.startingPrice) {
                    <div class="gm-trainer-card__price-tag">
                      <span class="gm-trainer-card__price-from">from</span>
                      <span class="gm-trainer-card__price-val">\${{ trainer.startingPrice }}</span>
                      <span class="gm-trainer-card__price-unit">/session</span>
                    </div>
                  }
                </div>

                <!-- Avatar -->
                <div class="gm-trainer-card__avatar-wrap">
                  <div class="gm-trainer-card__avatar">
                    @if (getTrainerPhotoUrl(trainer)) {
                      <img [src]="getTrainerPhotoUrl(trainer)" [alt]="trainer.userName" />
                    } @else {
                      <span>{{ trainer.userName?.charAt(0)?.toUpperCase() || 'T' }}</span>
                    }
                  </div>
                  <div class="gm-trainer-card__online-dot"></div>
                </div>

                <!-- Body -->
                <div class="gm-trainer-card__body">
                  <div class="gm-trainer-card__head">
                    <div>
                      <h3 class="gm-trainer-card__name">{{ trainer.userName || 'Trainer' }}</h3>
                      @if (trainer.handle) {
                        <p class="gm-trainer-card__handle">&#64;{{ trainer.handle }}</p>
                      }
                    </div>
                    @if (trainer.ratingAverage) {
                      <div class="gm-trainer-card__rating">
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="#F59E0B"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        {{ (trainer.ratingAverage).toFixed(1) }}
                        @if (trainer.totalReviews) {
                          <span class="gm-trainer-card__reviews">({{ trainer.totalReviews }})</span>
                        }
                      </div>
                    }
                  </div>

                  @if (trainer.bio) {
                    <p class="gm-trainer-card__bio">{{ trainer.bio }}</p>
                  }

                  <!-- Stats row -->
                  <div class="gm-trainer-card__stats">
                    @if (trainer.yearsExperience) {
                      <div class="gm-trainer-card__stat">
                        <strong>{{ trainer.yearsExperience }}</strong><span>yrs exp</span>
                      </div>
                    }
                    @if (trainer.totalClients) {
                      <div class="gm-trainer-card__stat">
                        <strong>{{ trainer.totalClients }}</strong><span>clients</span>
                      </div>
                    }
                    @if (trainer.totalReviews) {
                      <div class="gm-trainer-card__stat">
                        <strong>{{ trainer.totalReviews }}</strong><span>reviews</span>
                      </div>
                    }
                  </div>

                  <button
                    class="gm-trainer-card__cta"
                    (click)="viewTrainerProfile(trainer); $event.stopPropagation()">
                    View Profile
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </article>
            }
          </div>

          <div class="gm-section-cta">
            <button [routerLink]="['/discover/trainers']" class="gm-pill-cta">
              View All Trainers
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        }
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         WHY GYMUNITY — Feature Strip
    ═══════════════════════════════════════════════════════════════ -->
    <section class="gm-section gm-section--dark">
      <div class="gm-container">
        <div class="gm-section-head gm-section-head--light">
          <span class="gm-section-head__eyebrow gm-section-head__eyebrow--light">Our Edge</span>
          <h2 class="gm-section-head__title">Why Choose Gymunity?</h2>
          <p class="gm-section-head__desc gm-section-head__desc--light">Everything you need to succeed, in one place</p>
        </div>

        <div class="gm-features-grid">
          <div class="gm-feature">
            <div class="gm-feature__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3>Affordable Pricing</h3>
            <p>Flexible payment plans for every budget. No hidden fees, no surprises.</p>
          </div>
          <div class="gm-feature">
            <div class="gm-feature__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3>Verified Trainers</h3>
            <p>Every trainer is background-checked, certified, and proven by real results.</p>
          </div>
          <div class="gm-feature">
            <div class="gm-feature__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            </div>
            <h3>Personalized Plans</h3>
            <p>Custom programs built around your body, goals, and schedule.</p>
          </div>
          <div class="gm-feature">
            <div class="gm-feature__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
            <h3>24/7 Support</h3>
            <p>We're always here — for questions, guidance, or motivation at any hour.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         PROGRAMS SHOWCASE
    ═══════════════════════════════════════════════════════════════ -->
    <section class="gm-section gm-section--light">
      <div class="gm-container">
        <div class="gm-section-head">
          <span class="gm-section-head__eyebrow">Explore</span>
          <h2 class="gm-section-head__title">Popular Programs</h2>
          <p class="gm-section-head__desc">For all levels, all goals, all lifestyles</p>
        </div>

        @if (isLoadingPrograms()) {
          <div class="gm-loading">
            <div class="gm-spinner"></div>
            <span>Loading programs…</span>
          </div>
        } @else if (popularPrograms().length > 0) {
          <div class="gm-programs-grid">
            @for (program of popularPrograms(); track program.id) {
              <div class="gm-program-card" (click)="viewProgram(program.id)">
                <div class="gm-program-card__thumb">
                  @if (program.thumbnailUrl) {
                    <img [src]="program.thumbnailUrl" [alt]="program.title" />
                  } @else {
                    <div class="gm-program-card__thumb-placeholder">💪</div>
                  }
                  <div class="gm-program-card__overlay"></div>
                  @if (program.type) {
                    <span class="gm-program-card__type">{{ program.type }}</span>
                  }
                </div>
                <div class="gm-program-card__body">
                  <h3>{{ program.title || 'Program' }}</h3>
                  <p>{{ program.description || 'Fitness program designed for you' }}</p>
                  <div class="gm-program-card__meta">
                    @if (program.durationWeeks) {
                      <span>⏱ {{ program.durationWeeks }} weeks</span>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- Fallback category cards -->
          <div class="gm-programs-grid">
            <div class="gm-program-card gm-program-card--strength" (click)="navigateToPrograms()">
              <div class="gm-program-card__thumb">
                <div class="gm-program-card__thumb-placeholder">🏋️</div>
              </div>
              <div class="gm-program-card__body">
                <h3>Strength Training</h3>
                <p>Build muscle and increase your overall strength with comprehensive programs</p>
              </div>
            </div>
            <div class="gm-program-card gm-program-card--cardio" (click)="navigateToPrograms()">
              <div class="gm-program-card__thumb">
                <div class="gm-program-card__thumb-placeholder">🏃</div>
              </div>
              <div class="gm-program-card__body">
                <h3>Cardio & Endurance</h3>
                <p>Boost cardiovascular health and stamina with dynamic workouts</p>
              </div>
            </div>
            <div class="gm-program-card gm-program-card--yoga" (click)="navigateToPrograms()">
              <div class="gm-program-card__thumb">
                <div class="gm-program-card__thumb-placeholder">🧘</div>
              </div>
              <div class="gm-program-card__body">
                <h3>Flexibility & Yoga</h3>
                <p>Enhance balance, flexibility, and mental wellness through mindful movement</p>
              </div>
            </div>
          </div>
        }

        <div class="gm-section-cta">
          <button [routerLink]="['/discover/programs']" class="gm-pill-cta">
            Browse All Programs
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         TESTIMONIALS
    ═══════════════════════════════════════════════════════════════ -->
    <section class="gm-section gm-section--accent">
      <div class="gm-container">
        <div class="gm-section-head">
          <span class="gm-section-head__eyebrow">Real Results</span>
          <h2 class="gm-section-head__title">Success Stories</h2>
          <p class="gm-section-head__desc">Thousands have transformed — now it's your turn</p>
        </div>

        <div class="gm-testimonials">
          @for (t of testimonials; track t.id) {
            <div class="gm-testimonial">
              <div class="gm-testimonial__stars">★★★★★</div>
              <p class="gm-testimonial__text">"{{ t.text }}"</p>
              <div class="gm-testimonial__author">
                <div class="gm-testimonial__avatar">{{ t.author.charAt(0) }}</div>
                <div>
                  <p class="gm-testimonial__name">{{ t.author }}</p>
                  <p class="gm-testimonial__role">{{ t.role }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         FINAL CTA
    ═══════════════════════════════════════════════════════════════ -->
    <section class="gm-finale">
      <div class="gm-finale__bg">
        <div class="gm-orb gm-orb--finale-1"></div>
        <div class="gm-orb gm-orb--finale-2"></div>
      </div>
      <div class="gm-finale__content">
        <h2 class="gm-finale__title">
          Ready to <em>Transform</em><br>Your Fitness?
        </h2>
        <p class="gm-finale__desc">
          Join Gymunity today and connect with expert trainers<br>who are ready to help you achieve extraordinary results.
        </p>
        <div class="gm-finale__actions">
          @if (currentUser()) {
            <button [routerLink]="['/discover/trainers']" class="gm-cta gm-cta--white">Find My Trainer →</button>
            <button [routerLink]="['/discover/programs']" class="gm-cta gm-cta--outline-white">Browse Programs</button>
          } @else {
            <button [routerLink]="['/auth/register']" class="gm-cta gm-cta--white">Get Started Free →</button>
            <button [routerLink]="['/discover/trainers']" class="gm-cta gm-cta--outline-white">Browse Trainers</button>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ═══════════════════════════════════════════════════════════════
       DESIGN TOKENS
    ═══════════════════════════════════════════════════════════════ */
    :host {
      --clr-primary: #0EA5E9;
      --clr-primary-dark: #0284C7;
      --clr-primary-light: #38BDF8;
      --clr-accent: #F59E0B;
      --clr-dark: #0F172A;
      --clr-dark-2: #1E293B;
      --clr-text: #1E293B;
      --clr-muted: #64748B;
      --clr-border: #E2E8F0;
      --clr-surface: #F8FAFC;
      --font-display: 'Georgia', 'Times New Roman', serif;
      --font-body: 'Helvetica Neue', 'Arial', sans-serif;
      --radius: 16px;
      --radius-sm: 10px;
      --shadow-card: 0 4px 24px rgba(0,0,0,0.08);
      --shadow-card-hover: 0 16px 48px rgba(0,0,0,0.16);
      --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: block;
      font-family: var(--font-body);
      color: var(--clr-text);
    }

    /* ═══════════════════════════════════════════════════════════════
       NAVIGATION
    ═══════════════════════════════════════════════════════════════ */
    .gm-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      transition: var(--transition);
      background: transparent;
    }
    .gm-nav--scrolled {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--clr-border);
      box-shadow: 0 4px 32px rgba(0,0,0,0.08);
    }
    .gm-nav__inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
      height: 72px;
      display: flex;
      align-items: center;
      gap: 40px;
    }
    .gm-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: none;
      flex-shrink: 0;
    }
    .gm-brand__icon {
      width: 38px; height: 38px;
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 16px rgba(14,165,233,0.4);
    }
    .gm-brand__name {
      font-size: 1.35rem;
      font-weight: 800;
      background: linear-gradient(135deg, var(--clr-primary-dark), #6366F1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.03em;
    }
    .gm-nav--scrolled .gm-brand__name {
      background: linear-gradient(135deg, var(--clr-primary-dark), #6366F1);
      -webkit-background-clip: text;
      background-clip: text;
    }
    .gm-nav__links {
      display: flex;
      align-items: center;
      gap: 32px;
      flex: 1;
    }
    .gm-nav__link {
      font-size: 0.9rem;
      font-weight: 500;
      color: rgba(255,255,255,0.9);
      text-decoration: none;
      transition: var(--transition);
      letter-spacing: 0.01em;
    }
    .gm-nav--scrolled .gm-nav__link {
      color: var(--clr-muted);
    }
    .gm-nav__link:hover {
      color: white;
    }
    .gm-nav--scrolled .gm-nav__link:hover {
      color: var(--clr-primary);
    }
    .gm-nav__auth {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    /* User Badge */
    .gm-user-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 40px;
      padding: 6px 14px 6px 6px;
      backdrop-filter: blur(10px);
      transition: var(--transition);
    }
    .gm-nav--scrolled .gm-user-badge {
      background: rgba(14,165,233,0.08);
      border-color: rgba(14,165,233,0.2);
    }
    .gm-user-badge__avatar {
      position: relative;
      width: 36px; height: 36px;
      border-radius: 50%;
      overflow: visible;
      flex-shrink: 0;
    }
    .gm-user-badge__img {
      width: 36px; height: 36px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255,255,255,0.6);
    }
    .gm-user-badge__initials {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
      color: white;
      font-weight: 700;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255,255,255,0.6);
    }
    .gm-user-badge__dot {
      position: absolute;
      bottom: 1px; right: 1px;
      width: 10px; height: 10px;
      background: #22C55E;
      border: 2px solid white;
      border-radius: 50%;
    }
    .gm-user-badge__info {
      display: flex;
      flex-direction: column;
    }
    .gm-user-badge__greeting {
      font-size: 0.65rem;
      color: rgba(255,255,255,0.7);
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      line-height: 1;
    }
    .gm-nav--scrolled .gm-user-badge__greeting {
      color: var(--clr-muted);
    }
    .gm-user-badge__name {
      font-size: 0.85rem;
      font-weight: 700;
      color: white;
      line-height: 1.3;
    }
    .gm-nav--scrolled .gm-user-badge__name {
      color: var(--clr-dark);
    }

    /* Buttons */
    .gm-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: var(--transition);
      text-decoration: none;
    }
    .gm-btn--ghost {
      background: transparent;
      color: rgba(255,255,255,0.85);
    }
    .gm-nav--scrolled .gm-btn--ghost {
      color: var(--clr-muted);
    }
    .gm-btn--ghost:hover {
      color: white;
      background: rgba(255,255,255,0.1);
    }
    .gm-nav--scrolled .gm-btn--ghost:hover {
      color: var(--clr-primary);
      background: rgba(14,165,233,0.08);
    }
    .gm-btn--outline {
      background: rgba(255,255,255,0.12);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
    }
    .gm-nav--scrolled .gm-btn--outline {
      background: transparent;
      color: var(--clr-text);
      border-color: var(--clr-border);
    }
    .gm-btn--outline:hover {
      background: rgba(255,255,255,0.2);
    }
    .gm-nav--scrolled .gm-btn--outline:hover {
      background: var(--clr-surface);
      border-color: var(--clr-primary);
      color: var(--clr-primary);
    }
    .gm-btn--primary {
      background: linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark));
      color: white;
      box-shadow: 0 4px 16px rgba(14,165,233,0.3);
    }
    .gm-btn--primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(14,165,233,0.4);
    }

    /* Mobile burger */
    .gm-nav__burger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      margin-left: auto;
    }
    .gm-burger__bar {
      display: block;
      width: 24px;
      height: 2px;
      background: white;
      border-radius: 2px;
      transition: var(--transition);
      transform-origin: center;
    }
    .gm-nav--scrolled .gm-burger__bar { background: var(--clr-text); }
    .gm-burger__bar--open-1 { transform: translateY(7px) rotate(45deg); }
    .gm-burger__bar--open-2 { opacity: 0; transform: scaleX(0); }
    .gm-burger__bar--open-3 { transform: translateY(-7px) rotate(-45deg); }

    /* Mobile Menu */
    .gm-mobile-menu {
      display: none;
      flex-direction: column;
      background: white;
      border-top: 1px solid var(--clr-border);
      padding: 16px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease;
    }
    .gm-mobile-menu--open {
      max-height: 600px;
    }
    .gm-mobile-user {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: var(--clr-surface);
      border-radius: var(--radius-sm);
      margin-bottom: 12px;
    }
    .gm-mobile-user__avatar {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }
    .gm-mobile-user__avatar img { width: 100%; height: 100%; object-fit: cover; }
    .gm-mobile-user__greeting {
      font-size: 0.7rem;
      color: var(--clr-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      margin: 0;
    }
    .gm-mobile-user__name {
      font-weight: 700;
      color: var(--clr-text);
      margin: 2px 0 1px;
      font-size: 0.95rem;
    }
    .gm-mobile-user__email {
      font-size: 0.75rem;
      color: var(--clr-muted);
      margin: 0;
    }
    .gm-mobile-link {
      display: block;
      padding: 12px 8px;
      color: var(--clr-text);
      text-decoration: none;
      font-weight: 500;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      cursor: pointer;
      border-radius: var(--radius-sm);
      transition: var(--transition);
      font-size: 0.95rem;
    }
    .gm-mobile-link:hover { background: var(--clr-surface); color: var(--clr-primary); }
    .gm-mobile-link--danger { color: #EF4444; }
    .gm-mobile-divider {
      height: 1px;
      background: var(--clr-border);
      margin: 8px 0;
    }
    .gm-mobile-cta {
      display: block;
      margin-top: 8px;
      padding: 14px;
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
      color: white;
      border: none;
      border-radius: var(--radius-sm);
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      text-align: center;
      width: 100%;
    }

    /* ═══════════════════════════════════════════════════════════════
       HERO
    ═══════════════════════════════════════════════════════════════ */
    .gm-hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 120px 24px 80px;
    }
    .gm-hero__bg {
      position: absolute;
      inset: 0;
      z-index: 0;
    }
    .gm-hero__bg-img {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-color: #0F172A;
      transition: background-image 1.2s ease;
    }
    .gm-hero__gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg,
        rgba(15,23,42,0.88) 0%,
        rgba(2,132,199,0.65) 50%,
        rgba(99,102,241,0.55) 100%);
    }
    .gm-hero__noise {
      position: absolute;
      inset: 0;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* Floating orbs */
    .gm-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.25;
      animation: gm-float 8s ease-in-out infinite;
    }
    .gm-orb--1 {
      width: 500px; height: 500px;
      background: var(--clr-primary);
      top: -100px; right: -100px;
      animation-delay: 0s;
    }
    .gm-orb--2 {
      width: 400px; height: 400px;
      background: #6366F1;
      bottom: -100px; left: -100px;
      animation-delay: 3s;
    }
    .gm-orb--3 {
      width: 300px; height: 300px;
      background: var(--clr-accent);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      animation-delay: 6s;
      opacity: 0.1;
    }

    @keyframes gm-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-30px); }
    }

    .gm-hero__progress {
      position: absolute;
      bottom: 40px; left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 8px;
      z-index: 10;
    }
    .gm-hero__pip {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      border: none;
      cursor: pointer;
      transition: var(--transition);
    }
    .gm-hero__pip--active {
      background: white;
      width: 28px;
      border-radius: 4px;
    }

    .gm-hero__content {
      position: relative;
      z-index: 5;
      max-width: 720px;
      margin: 0 auto;
      animation: gm-fade-up 0.9s ease-out;
    }

    @keyframes gm-fade-up {
      from { opacity: 0; transform: translateY(32px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Welcome pill for logged-in users */
    .gm-hero__welcome-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(34,197,94,0.15);
      border: 1px solid rgba(34,197,94,0.35);
      border-radius: 40px;
      padding: 8px 18px;
      color: #86EFAC;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 28px;
      backdrop-filter: blur(10px);
    }
    .gm-hero__welcome-dot {
      width: 8px; height: 8px;
      background: #22C55E;
      border-radius: 50%;
      animation: gm-pulse 2s ease infinite;
      flex-shrink: 0;
    }
    @keyframes gm-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.8); }
    }

    .gm-hero__badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 40px;
      padding: 8px 18px;
      color: rgba(255,255,255,0.9);
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 28px;
      backdrop-filter: blur(10px);
    }

    .gm-hero__headline {
      font-family: var(--font-display);
      font-size: clamp(3rem, 6vw, 5rem);
      font-weight: 900;
      color: white;
      line-height: 1.05;
      letter-spacing: -0.03em;
      margin: 0 0 24px;
    }
    .gm-hero__headline-sub {
      display: block;
      font-size: 0.45em;
      font-weight: 400;
      color: rgba(255,255,255,0.6);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-family: var(--font-body);
      margin-bottom: 8px;
    }
    .gm-hero__accent {
      font-style: italic;
      background: linear-gradient(90deg, #38BDF8, #818CF8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .gm-hero__sub {
      font-size: 1.15rem;
      color: rgba(255,255,255,0.72);
      line-height: 1.7;
      margin: 0 0 40px;
      max-width: 560px;
    }
    .gm-hero__sub strong { color: rgba(255,255,255,0.95); }

    .gm-hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-bottom: 56px;
    }

    /* CTA Buttons */
    .gm-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      border: none;
      transition: var(--transition);
      letter-spacing: -0.01em;
    }
    .gm-cta--primary {
      background: white;
      color: var(--clr-primary-dark);
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }
    .gm-cta--primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 16px 48px rgba(0,0,0,0.3);
    }
    .gm-cta--secondary {
      background: rgba(255,255,255,0.12);
      color: white;
      border: 1.5px solid rgba(255,255,255,0.3);
      backdrop-filter: blur(10px);
    }
    .gm-cta--secondary:hover {
      background: rgba(255,255,255,0.2);
      border-color: rgba(255,255,255,0.5);
    }
    .gm-cta--white {
      background: white;
      color: var(--clr-primary-dark);
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }
    .gm-cta--white:hover { transform: translateY(-2px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }
    .gm-cta--outline-white {
      background: transparent;
      color: white;
      border: 2px solid rgba(255,255,255,0.5);
    }
    .gm-cta--outline-white:hover { background: rgba(255,255,255,0.1); border-color: white; }

    .gm-hero__stats {
      display: flex;
      align-items: center;
      gap: 0;
    }
    .gm-stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 0 32px 0 0;
    }
    .gm-stat:first-child { padding-left: 0; }
    .gm-stat__num {
      font-size: 2rem;
      font-weight: 800;
      color: white;
      letter-spacing: -0.03em;
      line-height: 1;
    }
    .gm-stat__label {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.55);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .gm-stat__divider {
      width: 1px;
      height: 40px;
      background: rgba(255,255,255,0.15);
      margin: 0 32px 0 0;
    }

    .gm-hero__scroll {
      position: absolute;
      right: 40px; bottom: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      z-index: 10;
    }
    .gm-hero__scroll span {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.5);
      writing-mode: vertical-rl;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .gm-hero__scroll-line {
      width: 1px;
      height: 60px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
      animation: gm-scroll-line 2s ease-in-out infinite;
    }
    @keyframes gm-scroll-line {
      0% { transform: scaleY(0); transform-origin: top; }
      50% { transform: scaleY(1); transform-origin: top; }
      51% { transform: scaleY(1); transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }

    /* ═══════════════════════════════════════════════════════════════
       SECTION LAYOUT
    ═══════════════════════════════════════════════════════════════ */
    .gm-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .gm-section {
      padding: 100px 0;
    }
    .gm-section--light { background: white; }
    .gm-section--dark {
      background: var(--clr-dark);
    }
    .gm-section--accent {
      background: linear-gradient(160deg, #F0F9FF 0%, #EFF6FF 100%);
    }

    .gm-section-head {
      text-align: center;
      margin-bottom: 64px;
    }
    .gm-section-head__eyebrow {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--clr-primary);
      margin-bottom: 12px;
    }
    .gm-section-head__eyebrow--light {
      color: var(--clr-primary-light);
    }
    .gm-section-head__title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: var(--clr-dark);
      letter-spacing: -0.03em;
      margin: 0 0 16px;
      font-family: var(--font-display);
    }
    .gm-section--dark .gm-section-head__title { color: white; }
    .gm-section-head__desc {
      font-size: 1.05rem;
      color: var(--clr-muted);
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.6;
    }
    .gm-section-head__desc--light { color: rgba(255,255,255,0.55); }

    .gm-section-cta {
      display: flex;
      justify-content: center;
      margin-top: 56px;
    }
    .gm-pill-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: var(--clr-surface);
      border: 1.5px solid var(--clr-border);
      border-radius: 40px;
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--clr-primary);
      cursor: pointer;
      transition: var(--transition);
    }
    .gm-pill-cta:hover {
      background: var(--clr-primary);
      color: white;
      border-color: var(--clr-primary);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(14,165,233,0.3);
    }

    /* Loading */
    .gm-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 80px 0;
      color: var(--clr-muted);
      font-size: 0.9rem;
    }
    .gm-spinner {
      width: 40px; height: 40px;
      border: 3px solid var(--clr-border);
      border-top-color: var(--clr-primary);
      border-radius: 50%;
      animation: gm-spin 0.8s linear infinite;
    }
    @keyframes gm-spin { to { transform: rotate(360deg); } }

    /* ═══════════════════════════════════════════════════════════════
       TRAINER CARDS
    ═══════════════════════════════════════════════════════════════ */
    .gm-trainers-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .gm-trainer-card {
      background: white;
      border-radius: var(--radius);
      border: 1px solid var(--clr-border);
      overflow: hidden;
      cursor: pointer;
      transition: var(--transition);
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-card);
    }
    .gm-trainer-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-card-hover);
      border-color: var(--clr-primary-light);
    }
    .gm-trainer-card__cover {
      position: relative;
      height: 180px;
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
      overflow: hidden;
    }
    .gm-trainer-card__cover-img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .gm-trainer-card:hover .gm-trainer-card__cover-img {
      transform: scale(1.08);
    }
    .gm-trainer-card__cover-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.55), transparent 50%);
    }

    .gm-badge {
      position: absolute;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .gm-badge--verified {
      top: 12px; right: 12px;
      background: var(--clr-accent);
      color: #1C1917;
    }
    .gm-badge--active {
      top: 12px; left: 12px;
      background: rgba(34,197,94,0.9);
      color: white;
    }

    .gm-trainer-card__price-tag {
      position: absolute;
      bottom: 12px; right: 12px;
      display: flex;
      align-items: baseline;
      gap: 2px;
      color: white;
    }
    .gm-trainer-card__price-from {
      font-size: 0.65rem;
      opacity: 0.8;
    }
    .gm-trainer-card__price-val {
      font-size: 1.4rem;
      font-weight: 800;
      line-height: 1;
    }
    .gm-trainer-card__price-unit {
      font-size: 0.65rem;
      opacity: 0.8;
    }

    .gm-trainer-card__avatar-wrap {
      position: relative;
      width: 64px; height: 64px;
      margin: -32px 0 0 20px;
    }
    .gm-trainer-card__avatar {
      width: 64px; height: 64px;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
      border: 3px solid white;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 1.4rem;
    }
    .gm-trainer-card__avatar img {
      width: 100%; height: 100%;
      object-fit: cover;
    }
    .gm-trainer-card__online-dot {
      position: absolute;
      bottom: -2px; right: -2px;
      width: 14px; height: 14px;
      background: #22C55E;
      border: 2.5px solid white;
      border-radius: 50%;
    }

    .gm-trainer-card__body {
      padding: 12px 20px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .gm-trainer-card__head {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .gm-trainer-card__name {
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--clr-dark);
      margin: 0 0 2px;
      letter-spacing: -0.01em;
    }
    .gm-trainer-card:hover .gm-trainer-card__name {
      color: var(--clr-primary);
    }
    .gm-trainer-card__handle {
      font-size: 0.75rem;
      color: var(--clr-primary);
      font-weight: 500;
      margin: 0;
    }
    .gm-trainer-card__rating {
      display: flex;
      align-items: center;
      gap: 4px;
      background: #FEF9C3;
      padding: 4px 8px;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      color: #92400E;
      white-space: nowrap;
    }
    .gm-trainer-card__reviews {
      font-weight: 400;
      color: #A16207;
    }
    .gm-trainer-card__bio {
      font-size: 0.85rem;
      color: var(--clr-muted);
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 1;
    }

    .gm-trainer-card__stats {
      display: flex;
      gap: 0;
      border-top: 1px solid var(--clr-border);
      border-bottom: 1px solid var(--clr-border);
      padding: 12px 0;
    }
    .gm-trainer-card__stat {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 2px;
      border-right: 1px solid var(--clr-border);
    }
    .gm-trainer-card__stat:last-child { border-right: none; }
    .gm-trainer-card__stat strong {
      display: block;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--clr-dark);
    }
    .gm-trainer-card__stat span {
      font-size: 0.7rem;
      color: var(--clr-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .gm-trainer-card__cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 11px;
      background: linear-gradient(135deg, var(--clr-primary), var(--clr-primary-dark));
      color: white;
      border: none;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: var(--transition);
      margin-top: auto;
    }
    .gm-trainer-card__cta:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 24px rgba(14,165,233,0.35);
    }

    /* ═══════════════════════════════════════════════════════════════
       FEATURES
    ═══════════════════════════════════════════════════════════════ */
    .gm-features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    .gm-feature {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius);
      padding: 32px 24px;
      transition: var(--transition);
    }
    .gm-feature:hover {
      background: rgba(255,255,255,0.07);
      border-color: rgba(14,165,233,0.3);
      transform: translateY(-4px);
    }
    .gm-feature__icon {
      width: 56px; height: 56px;
      background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2));
      border: 1px solid rgba(14,165,233,0.3);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--clr-primary-light);
      margin-bottom: 20px;
    }
    .gm-feature h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: white;
      margin: 0 0 10px;
      letter-spacing: -0.01em;
    }
    .gm-feature p {
      font-size: 0.875rem;
      color: rgba(255,255,255,0.5);
      line-height: 1.6;
      margin: 0;
    }

    /* ═══════════════════════════════════════════════════════════════
       PROGRAMS
    ═══════════════════════════════════════════════════════════════ */
    .gm-programs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .gm-program-card {
      background: white;
      border-radius: var(--radius);
      border: 1px solid var(--clr-border);
      overflow: hidden;
      cursor: pointer;
      transition: var(--transition);
      box-shadow: var(--shadow-card);
    }
    .gm-program-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-card-hover);
    }
    .gm-program-card__thumb {
      position: relative;
      height: 200px;
      overflow: hidden;
    }
    .gm-program-card--strength .gm-program-card__thumb { background: linear-gradient(135deg, #F97316, #EF4444); }
    .gm-program-card--cardio .gm-program-card__thumb { background: linear-gradient(135deg, #06B6D4, #3B82F6); }
    .gm-program-card--yoga .gm-program-card__thumb { background: linear-gradient(135deg, #A855F7, #EC4899); }
    .gm-program-card:not(.gm-program-card--strength):not(.gm-program-card--cardio):not(.gm-program-card--yoga) .gm-program-card__thumb {
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
    }
    .gm-program-card__thumb img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
    .gm-program-card:hover .gm-program-card__thumb img { transform: scale(1.08); }
    .gm-program-card__thumb-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 4rem;
      filter: drop-shadow(0 4px 16px rgba(0,0,0,0.2));
      transition: transform 0.4s ease;
    }
    .gm-program-card:hover .gm-program-card__thumb-placeholder { transform: scale(1.15) rotate(-5deg); }
    .gm-program-card__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%);
    }
    .gm-program-card__type {
      position: absolute;
      top: 14px; left: 14px;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 5px 10px;
      border-radius: 6px;
    }
    .gm-program-card__body {
      padding: 20px;
    }
    .gm-program-card__body h3 {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--clr-dark);
      margin: 0 0 8px;
      letter-spacing: -0.01em;
    }
    .gm-program-card__body p {
      font-size: 0.875rem;
      color: var(--clr-muted);
      line-height: 1.5;
      margin: 0 0 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .gm-program-card__meta {
      font-size: 0.8rem;
      color: var(--clr-muted);
    }

    /* ═══════════════════════════════════════════════════════════════
       TESTIMONIALS
    ═══════════════════════════════════════════════════════════════ */
    .gm-testimonials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .gm-testimonial {
      background: white;
      border-radius: var(--radius);
      padding: 32px;
      border: 1px solid rgba(14,165,233,0.1);
      box-shadow: 0 2px 16px rgba(14,165,233,0.06);
      transition: var(--transition);
    }
    .gm-testimonial:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(14,165,233,0.1);
      border-color: rgba(14,165,233,0.2);
    }
    .gm-testimonial__stars {
      color: var(--clr-accent);
      font-size: 1.1rem;
      letter-spacing: 2px;
      margin-bottom: 16px;
    }
    .gm-testimonial__text {
      font-size: 0.95rem;
      color: var(--clr-text);
      line-height: 1.7;
      margin: 0 0 24px;
      font-style: italic;
    }
    .gm-testimonial__author {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .gm-testimonial__avatar {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--clr-primary), #6366F1);
      color: white;
      font-weight: 800;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .gm-testimonial__name {
      font-weight: 700;
      color: var(--clr-dark);
      margin: 0 0 2px;
      font-size: 0.9rem;
    }
    .gm-testimonial__role {
      font-size: 0.78rem;
      color: var(--clr-muted);
      margin: 0;
    }

    /* ═══════════════════════════════════════════════════════════════
       FINALE CTA
    ═══════════════════════════════════════════════════════════════ */
    .gm-finale {
      position: relative;
      background: var(--clr-dark);
      padding: 120px 24px;
      text-align: center;
      overflow: hidden;
    }
    .gm-finale__bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
    .gm-orb--finale-1 {
      width: 600px; height: 600px;
      background: var(--clr-primary);
      top: -200px; left: -200px;
      opacity: 0.12;
    }
    .gm-orb--finale-2 {
      width: 500px; height: 500px;
      background: #6366F1;
      bottom: -200px; right: -200px;
      opacity: 0.12;
      animation-delay: 4s;
    }
    .gm-finale__content {
      position: relative;
      z-index: 5;
      max-width: 640px;
      margin: 0 auto;
    }
    .gm-finale__title {
      font-family: var(--font-display);
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 900;
      color: white;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin: 0 0 24px;
    }
    .gm-finale__title em {
      font-style: italic;
      background: linear-gradient(90deg, #38BDF8, #818CF8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .gm-finale__desc {
      font-size: 1.1rem;
      color: rgba(255,255,255,0.55);
      line-height: 1.7;
      margin: 0 0 48px;
    }
    .gm-finale__actions {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      justify-content: center;
    }

    /* ═══════════════════════════════════════════════════════════════
       RESPONSIVE
    ═══════════════════════════════════════════════════════════════ */
    @media (max-width: 1024px) {
      .gm-trainers-grid { grid-template-columns: repeat(2, 1fr); }
      .gm-features-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .gm-nav__links, .gm-nav__auth { display: none; }
      .gm-nav__burger { display: flex; }
      .gm-mobile-menu { display: flex; }

      .gm-hero { padding: 100px 20px 60px; min-height: unset; }
      .gm-hero__scroll { display: none; }
      .gm-hero__headline { font-size: 2.8rem; }
      .gm-hero__stats { flex-direction: row; flex-wrap: wrap; gap: 16px; }
      .gm-stat { padding: 0; }
      .gm-stat__divider { display: none; }

      .gm-trainers-grid { grid-template-columns: 1fr; }
      .gm-programs-grid { grid-template-columns: 1fr; }
      .gm-features-grid { grid-template-columns: 1fr; }
      .gm-testimonials { grid-template-columns: 1fr; }

      .gm-section { padding: 72px 0; }
    }
  `]
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