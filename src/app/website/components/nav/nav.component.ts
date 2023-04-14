import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../../services/store.service'
import { AuthService } from '../../../services/auth.service';
import { CategoriesService } from '../../../services/categories.service';

import { User } from '../../../models/user.model';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
    this.getAllCategories()
    console.log(this.categories);

    this.authService.user$.subscribe(
      data => this.profile = data
    )

  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('admin@mail.com', 'admin123')
      .subscribe(() => {
        this.router.navigate(['/profile'])
      });
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home'])

  }

  getAllCategories() {
    this.categoryService.getAll(5, 0).subscribe(
      data => this.categories = data
    )
  }
}
