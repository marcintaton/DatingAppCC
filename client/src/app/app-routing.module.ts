import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListsComponent } from './components/lists/lists.component';
import { authGuard } from './guards/auth.guard';
import { TestErrorComponent } from './components/errors/test-error/test-error.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'lists', component: ListsComponent },
      {
        path: 'members',
        component: MemberListComponent,
      },
      {
        path: 'members/:username',
        component: MemberDetailsComponent,
      },
      { path: 'chat', component: ChatComponent },
      {
        path: 'member/edit',
        component: MemberEditComponent,
      },
    ],
  },
  { path: 'errors', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
