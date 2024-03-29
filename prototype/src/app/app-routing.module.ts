import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPathComponent } from './body/my-path/my-path.component';
import { MyNetworkComponent } from './body/my-network/my-network.component';
import { PageComponent } from './body/my-path/component/lesson/page/page.component';
import { LessonComponent } from './body/my-path/component/lesson/lesson.component';
import { QuizComponent } from './body/my-path/component/quiz/quiz.component';


const routes: Routes = [
  {path: 'myPath', component: MyPathComponent},
  {path: 'myNetwork', component: MyNetworkComponent},
  {path: ':idTop/lesson/:idLesson', component: LessonComponent},
  {path: 'quiz/:idQuiz/:idQuestion', component: QuizComponent},
  {path: '', redirectTo: '/myPath', pathMatch: 'full'},
  {path: '**', redirectTo: '/myPath'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
