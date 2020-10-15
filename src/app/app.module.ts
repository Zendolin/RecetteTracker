import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeService } from './services/recipe.service';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './services/auth.service';


const appRoutes: Routes = [
  {path: "auth/signin", component: SigninComponent},
  {path: "add", component: RecipeFormComponent},
  {path: "recipes/view/:id", component: RecipeDetailComponent},
  {path: "", component: RecipeListComponent},
  {path: "**", redirectTo: ""}  
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeCardComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipeFormComponent,
    RecipeDetailComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RecipeService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
