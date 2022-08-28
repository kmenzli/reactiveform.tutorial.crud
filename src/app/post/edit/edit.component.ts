import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "../post";
import { PostService } from "../post.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup;

  ngOnInit(): void {
    this.id = this.route.snapshot.params["postId"];
    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
    });
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res: any) => {
      console.log("Post updated successfully!");
      this.router.navigateByUrl("post/index");
    });
  }
}
