import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  variable : any;

  constructor(private http: HttpClient) {}
  @ViewChild('postForm') ele: any;
  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post("http://localhost:3000/randomData",postData).subscribe(data=>{console.log("data sent!!");
    this.ele.reset();})
    
  }

  onFetchPosts() {
    // Send Http request
    this.http.get("http://localhost:3000/randomData").subscribe(data=>
    {console.log(Object.keys(data).length);
      this.variable = data
      
      for (let i=0;i<Object.keys(data).length;i++){
        this.loadedPosts.push(data[i])
      }
      
      // console.log(this.loadedPosts)
      // console.log(typeof(this.loadedPosts))
  })

  // this.http.get("http://localhost:3000/randomData").pipe(
  //     map((response)=>{
  //       for (let key in response){
  //         this.loadedPosts.push({...response[key],key});
  //       }
  //       console.log(typeof(this.loadedPosts))
  //       return this.loadedPosts;
  //     })
  //     )
  //     .subscribe((response)=>
  //   {
  //     this.loadedPosts = response;
  //     console.log(typeof(this.loadedPosts))
  // });
     
  }

  onClearPosts() {
    // Send Http request
    for (let i of this.loadedPosts){
    this.http.delete("http://localhost:3000/randomData/"+i.id).subscribe(data=>console.log(data),(error)=>console.log(error))
    // console.log(i);
    }
  }
  data(event){
    console.log(event.target.innerHTML)
  }
}
