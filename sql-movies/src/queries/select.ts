export const selectActorByName = (fullName: string): string => {
  return `SELECT full_name 
          FROM actors
          WHERE full_name = '${fullName}';`
};

export const selectKeyword = (keyword: string): string => {
  return `SELECT keyword 
          FROM keywords
          WHERE keyword = '${keyword}';`
};

export const selectDirector = (director: string): string => {
  return `SELECT full_name 
          FROM directors
          WHERE full_name = '${director}';`
};

export const selectGenre = (genre: string): string => {
  return `SELECT genre 
          FROM genres
          WHERE genre = '${genre}';`
};

export const selectProductionCompany = (company: string): string => {
  return `SELECT company_name 
          FROM production_companies
          WHERE company_name = '${company}';`
};

export const selectMovie = (imdbId: string): string => {
  return `SELECT * 
          FROM movies
          WHERE imdb_id = '${imdbId}';`
};

export const selectMovieId = (imdbId: string): string => {
  return `SELECT id
          FROM movies
          WHERE imdb_id = '${imdbId}';`
};

export const selectRatingsByUserID = (userId: number): string => {
  return `SELECT user_id, rating, time_created
          FROM movie_ratings
          WHERE user_id = '${userId}';`
};

export const selectGenresByMovieId = (movieId: number): string => {
  return `select g.genre from movie_genres mg join genres g on g.id = mg.genre_id where mg.movie_id = ${movieId}`;
};

export const selectActorsByMovieId = (movieId: number): string => {
  return `select a.full_name from movie_actors ma join actors a on a.id = ma.actor_id where ma.movie_id = ${movieId}`;
};

export const selectDirectorsByMovieId = (movieId: number): string => {
  return `select d.full_name from movie_directors md join directors d on d.id = md.director_id where md.movie_id = ${movieId}`;
};

export const selectKeywordsByMovieId = (movieId: number): string => {
  return `select k.keyword from movie_keywords mk join keywords k on k.id = mk.keyword_id where mk.movie_id = ${movieId}`;
};

export const selectProductionCompaniesByMovieId = (movieId: number): string => {
  return `select pc.company_name from movie_production_companies mpc join production_companies pc on pc.id = mpc.company_id where mpc.movie_id = ${movieId}`;
};

/**
 * select count as c, because an object is returned and expected property name is c
 */
export const selectCount = (table: string): string => {
  return `SELECT COUNT(*) AS c
  FROM ${table};`
};




export const selectMovieById = (id: number): string => {
  return `SELECT id
    FROM movies 
    WHERE id = ${id}`
};

export const selectGenreById = (id: number): string => {
  return `SELECT genre_id, genre
    FROM movie_genres JOIN genres ON (movie_genres.genre_id = genres.id)
    WHERE genre_id = ${id}`
};

export const selectDirectorById = (id: number): string => {
  return `SELECT director_id, full_name
    FROM movie_directors JOIN directors ON (movie_directors.director_id = directors.id)
    WHERE director_id = ${id}`
};

export const selectActorById = (id: number): string => {
  return `SELECT actor_id, full_name
    FROM movie_actors JOIN actors ON (movie_actors.actor_id = actors.id)
    WHERE actor_id = ${id}`
};

export const selectKeywordById = (id: number): string => {
  return `SELECT keyword_id, keyword
    FROM movie_keywords JOIN keywords ON (movie_keywords.keyword_id = keywords.id)
    WHERE keyword_id = ${id}`
};

export const selectProductionCompanyById = (id: number): string => {
  return `SELECT company_id, company_name
    FROM movie_production_companies JOIN production_companies ON (movie_production_companies.company_id = production_companies.id)
    WHERE company_id = ${id}`
};

