import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    {
        path: '',
        component: AuthLayoutComponent,
        canActivate:[loggedGuard],
        children: [
            { 
                path: 'login', 
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), 
                title: 'ByteCart - login' 
            },
            { 
                path: 'register', 
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), 
                title: 'ByteCart - register' 
            },
            { 
                path: 'forget', 
                loadComponent: () => import('./pages/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent), 
                title: 'ByteCart - Forget Password' 
            }
        ]
    },

    {
        path: '',
        component: BlankLayoutComponent, 
        canActivate:[authGuard],
        children: [
            { 
                path: 'home', 
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), 
                title: 'ByteCart - home' 
            },
            { 
                path: 'cart', 
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), 
                title: 'ByteCart - cart' 
            },
            { 
                path: 'wishlist', 
                loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent), 
                title: 'wishlist' 
            },
            { 
                path: 'products', 
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), 
                title: 'ByteCart - product' 
            },
            { 
                path: 'brands', 
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), 
                title: 'ByteCart - brand' 
            },
            { 
                path: 'categories', 
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent), 
                title: 'ByteCart - categories' 
            },
            { 
                path: 'checkout/:id', 
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), 
                title: 'ByteCart - checkout' 
            },
            {
                path:'details/:productId', 
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), 
                title:'Product Details'
            },
            { 
                path: 'allorders', 
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), 
                title: 'ByteCart - All Orders' 
            }
        ]
    },

    { path: '**', component: NotfoundComponent } // Catch-all route
];
