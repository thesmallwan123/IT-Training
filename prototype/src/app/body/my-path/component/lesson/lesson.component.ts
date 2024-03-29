import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetDataService } from '../../../../services/get-data.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  
  allLessons2;
  allPages = this.getData.getPages();
  id = parseInt(this.route.snapshot.paramMap.get('idLesson'));
  page: any =0;
  lesson: any =0;
  mustHavePages;
  pageID = 0;
  percDoneLesson = 0;
  allPerc = [];
  endPage = false;
  allTopic = this.getData.getTopic();
  topicId = parseInt(this.route.snapshot.paramMap.get('idTop')) - 1;
  currentTopic = this.allTopic[this.topicId];
  lessonsLeft: number = 0;

  constructor(
    private getData: GetDataService,
    private route: ActivatedRoute
    ) { }

  
  
  
  ngOnInit() { 
    this.checkToQuiz();
    this.lessonsLeft = this.getData.howManyLessons(this.currentTopic);
  }

  //checks if the user should go to the quiz, based on the url
  checkToQuiz(){
    var lastItem = this.currentTopic.lessons.length -1;
    lastItem = this.currentTopic.lessons[lastItem];
    
    if(this.id > lastItem){
      this.goQuiz();
    }
    else{
      this.getlesson();
    }
    
  }
  
  //calculates the % of te lesson
  calcPerc(){
    this.percDoneLesson = this.getData.calcPercentage(this.allPerc)
  }
  
  // reinitialises all the lessons
  getlesson(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('idLesson'));
    this.allLessons2 = this.getData.getLessons()
    this.lesson = this.allLessons2[this.id]
    this.getPages();
  }
  
  //Reinitialises the pages, and calculates the new % done of the lesson
  getPages(){
    this.allPerc = [];
    this.mustHavePages = this.allLessons2[this.id].pageID;
    for(let i =0; i<this.mustHavePages.length;i++){

      this.page = this.allPages[this.mustHavePages[this.pageID]]
      this.allPerc.push(this.allPages[this.mustHavePages[i]])
      this.calcPerc();
    }
    if(this.page.id == 29){
      this.percDoneLesson = 100;
      this.endPage = true
    }
  }
  
  // Go to next page
  nextPage(){
    this.getData.setPages(this.allPages[this.mustHavePages[this.pageID]]);
    this.calcPerc();
    
    this.pageID = this.pageID + 1;
    const lastItem = this.mustHavePages.length -1;
    if(this.pageID > lastItem){
      return this.goNextLesson();
    }
    this.getPages();
  }
  
  //Go to Previous page
  previousPage(){
    
    this.pageID = this.pageID - 1;
    this.getData.removePages(this.allPages[this.mustHavePages[this.pageID]]);
    // this.calcPerc();
    this.getPages();
  }
  
  // Redirect to new lesson
  goNextLesson(){
    this.endPage=false;
    this.id = this.id +1;
    this.topicId = this.topicId +1;
    window.location.href = "http://localhost:4200/"+this.topicId+"/lesson/"+this.id;
  }
  
  //Redirects to quiz
  goQuiz(){
    this.topicId = this.topicId +1;
    window.location.href = "http://localhost:4200/quiz/"+this.topicId +"/"+0;
  }
      
}