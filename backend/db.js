
import pkg from "pg" ; 

const { Pool } = pkg

const pool = new Pool({
connectionString: "postgresql://neondb_owner:npg_pOugJ9HIN0ay@ep-weathered-haze-as4vd8rf.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require",
ssl: {

  rejectUnauthorized: false
}
})

export default pool