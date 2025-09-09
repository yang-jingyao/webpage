const { Pool } = require('pg');
require('dotenv').config();

// 创建数据库连接
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function runMigration() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database migration...');
    
    // 创建 waitlist_submissions 表
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS waitlist_submissions (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        school_name TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    await client.query(createTableQuery);
    console.log('✅ Table waitlist_submissions created successfully');
    
    // 创建索引以提高查询性能
    const createIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_email 
      ON waitlist_submissions(email);
    `;
    
    await client.query(createIndexQuery);
    console.log('✅ Index on email column created successfully');
    
    // 创建时间索引
    const createTimeIndexQuery = `
      CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_created_at 
      ON waitlist_submissions(created_at);
    `;
    
    await client.query(createTimeIndexQuery);
    console.log('✅ Index on created_at column created successfully');
    
    console.log('🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  runMigration()
    .then(() => {
      console.log('Migration script finished');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigration };
