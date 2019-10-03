import { Database } from "../src/database";
import { minutes } from "./utils";

describe("Queries Across Tables", () => {
  let db: Database;

  beforeAll(async () => {
    db = await Database.fromExisting("06", "07");
  }, minutes(3));

  it(
    "should select top three directors ordered by total budget spent in their movies",
    async done => {
      const query = `SELECT full_name AS director, ROUND(SUM(budget_adj), 2) AS total_budget
                    FROM movie_directors JOIN movies ON (movie_directors.movie_id = movies.id) 
                    JOIN directors ON (movie_directors.director_id = directors.id)
                    GROUP BY full_name
                    ORDER BY SUM(budget_adj) DESC
                    LIMIT 3`;
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          director: "Steven Spielberg",
          total_budget: 2173663066.68
        },
        {
          director: "Ridley Scott",
          total_budget: 1740157354.14
        },
        {
          director: "Michael Bay",
          total_budget: 1501996071.5
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top 10 keywords ordered by their appearance in movies",
    async done => {
      const query = `SELECT keyword, COUNT(*) AS count
                    FROM movie_keywords JOIN movies ON (movie_keywords.movie_id = movies.id) 
                    JOIN keywords ON (movie_keywords.keyword_id = keywords.id)
                    GROUP BY keyword
                    ORDER BY COUNT(*) DESC
                    LIMIT 10`;
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          keyword: "woman director",
          count: 411
        },
        {
          keyword: "independent film",
          count: 394
        },
        {
          keyword: "based on novel",
          count: 278
        },
        {
          keyword: "sex",
          count: 272
        },
        {
          keyword: "sport",
          count: 216
        },
        {
          keyword: "murder",
          count: 204
        },
        {
          keyword: "musical",
          count: 169
        },
        {
          keyword: "biography",
          count: 168
        },
        {
          keyword: "new york",
          count: 163
        },
        {
          keyword: "suspense",
          count: 157
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select one movie which has highest count of actors",
    async done => {
      const query = `SELECT original_title, COUNT(actor_id) AS count
                    FROM movie_actors JOIN movies ON (movie_actors.movie_id = movies.id) 
                    JOIN actors ON (movie_actors.actor_id = actors.id)
                    GROUP BY original_title
                    ORDER BY COUNT(actor_id) DESC
                    LIMIT 10`;
      const result = await db.selectSingleRow(query);

      expect(result).toEqual({
        original_title: "Hamlet",
        count: 20
      });

      done();
    },
    minutes(3)
  );

  it(
    "should select three genres which has most ratings with 5 stars",
    async done => {
      const query = `SELECT genre, COUNT(rating) AS five_stars_count
                    FROM movie_genres JOIN genres ON (movie_genres.genre_id = genres.id) 
                    JOIN movie_ratings ON (movie_genres.movie_id = movie_ratings.movie_id)
                    WHERE rating = 5
                    GROUP BY genre
                    ORDER BY COUNT(rating) DESC
                    LIMIT 3 `;
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Drama",
          five_stars_count: 143663
        },
        {
          genre: "Thriller",
          five_stars_count: 96265
        },
        {
          genre: "Comedy",
          five_stars_count: 81184
        }
      ]);

      done();
    },
    minutes(3)
  );

  it(
    "should select top three genres ordered by average rating",
    async done => {
      const query = `SELECT genre, ROUND(AVG(rating), 2) AS avg_rating
                    FROM movie_genres JOIN genres ON (movie_genres.genre_id = genres.id) 
                    JOIN movie_ratings ON (movie_genres.movie_id = movie_ratings.movie_id)
                    GROUP BY genre
                    ORDER BY AVG(rating) DESC
                    LIMIT 3 `;
      const result = await db.selectMultipleRows(query);

      expect(result).toEqual([
        {
          genre: "Western",
          avg_rating: 3.64
        },
        {
          genre: "Crime",
          avg_rating: 3.62
        },
        {
          genre: "Animation",
          avg_rating: 3.6
        }
      ]);

      done();
    },
    minutes(3)
  );
});
