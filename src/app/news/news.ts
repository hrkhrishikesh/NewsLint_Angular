import { Component, OnInit, signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface NewsArticle {
  title: string;
  description: string;
  urlToImage: string;
  url: string;
  author: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.html'
})
export class News implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  
  private apiKey = '51e52c38cfbc4ca09332d856d69e9f06';
  private pageSize = 100;
  private country = 'us';

  // signals == useState
  articles = signal<NewsArticle[]>([]);
  loading = signal<boolean>(false);
  category = signal<string>('general');
  error = signal<string | null>(null);

  ngOnInit(): void {
    // subscribe to data changes
    this.route.data.subscribe(data => {
      this.category.set(data['category'] || 'general');
      this.loadNews();
    });
  }

  private loadNews(): void {
    
    this.loading.set(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.category()}&apiKey=${this.apiKey}&pageSize=${this.pageSize}`;

    this.http.get<NewsResponse>(url).subscribe({
      next: (response) => {
        this.articles.set(response.articles || []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading news:', error);
        this.error.set('Failed to load news. Please try again later.');
        this.loading.set(false);
      }
    });
  }

  // capitalize name
  getCategoryTitle(): string {
    return this.category().charAt(0).toUpperCase() + this.category().slice(1);
  }

  //format date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  //default image
  getImageUrl(article: NewsArticle): string {
    return article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
  }

  //error image
  onImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
  }

  trackByUrl(index: number, article: NewsArticle): string {
    return article.url;
  }
}