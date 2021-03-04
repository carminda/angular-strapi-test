import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// import * as ARTICLE_QUERY from '../apollo/queries/article/article.js';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  data: any = {};
  loading = true;
  errors: any;

  private queryArticle: Subscription = new Subscription();

  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const ARTICLE_QUERY = gql`
      query Content($id: ID!) {
        content(id: $id) {
          id
          IsPublished
          CoverImage {
            id
            url
          }
          Description
        }
      }
    `;

    this.queryArticle = this.apollo
      .watchQuery({
        query: ARTICLE_QUERY,
        variables: {
          id: this.route.snapshot.paramMap.get('id'),
        },
      })
      .valueChanges.subscribe((result) => {
        console.log(JSON.stringify(result));
        const test: any = result.data;
        this.data = test.content;
        this.loading = result.loading;
        this.errors = result.errors;
      });
  }

  ngOnDestroy(): void {
    this.queryArticle.unsubscribe();
  }
}
