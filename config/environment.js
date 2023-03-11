const development = {
    name: "development",
    asset_path: '/assets',
    session_cookie_key: 'universe',
    db: 'codeial_development',
    atlas_db_user:"salonijain1936",
    atlas_db_pass:"Afiniafi4",
    smtp_obj: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: "tests11336699@gmail.com",
          pass: "bdeetuxivplctayo"
        }
      },
      googleClientID: '388485113850-hst46lr1p8issh3heakmrbgcd2m3atln.apps.googleusercontent.com',
      googleClientSecret: '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',
      googleCallbackURL: 'http://localhost:8000/users/auth/google/callback',
      jwt_secret: 'codeail'

}

const production = {
    name: "production"
}

module.exports = development;