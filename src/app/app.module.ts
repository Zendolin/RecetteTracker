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
import { ReviewListComponent } from './review-list/review-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { StepIngredientComponent } from './step-ingredient/step-ingredient.component';
import { StepInstructionComponent } from './step-instruction/step-instruction.component';
import { StepFinalComponent } from './step-final/step-final.component';
import { MakingComponent } from './making/making.component';
import { MakeitDirective } from './directives/makeit.directive';



const appRoutes: Routes = [
  {path: "auth/signin", component: SigninComponent},
  {path: "add", component: RecipeFormComponent},
  {path: "recipes/view/:id", component: RecipeDetailComponent},
  {path: "review", canActivate: [AuthGuardService], component: ReviewListComponent},
  {path: "review/:id", canActivate: [AuthGuardService], component: ReviewDetailComponent},
  {path: "makeit/:id", component: MakingComponent},
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
    SigninComponent,
    ReviewListComponent,
    ReviewDetailComponent,
    StepIngredientComponent,
    StepInstructionComponent,
    StepFinalComponent,
    MakingComponent,
    MakeitDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RecipeService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
