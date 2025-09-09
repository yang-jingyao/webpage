const { Pool } = require('pg');

// 创建数据库连接池
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default async function handler(req, res) {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      ok: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { fullName, email, schoolName } = req.body;

    // 必填字段校验
    if (!fullName || !email || !schoolName) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required fields: fullName, email, and schoolName are required'
      });
    }

    // 邮箱格式校验
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid email format'
      });
    }

    // 字段长度校验
    if (fullName.length > 100 || email.length > 100 || schoolName.length > 100) {
      return res.status(400).json({
        ok: false,
        error: 'Field values are too long (max 100 characters)'
      });
    }

    // 检查邮箱是否已存在
    const checkQuery = 'SELECT id FROM waitlist_submissions WHERE email = $1';
    const checkResult = await pool.query(checkQuery, [email.toLowerCase()]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({
        ok: false,
        error: 'Email already exists in waitlist'
      });
    }

    // 插入新记录
    const insertQuery = `
      INSERT INTO waitlist_submissions (full_name, email, school_name, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id, created_at
    `;
    
    const insertResult = await pool.query(insertQuery, [
      fullName.trim(),
      email.toLowerCase().trim(),
      schoolName.trim()
    ]);

    // 返回成功响应
    return res.status(200).json({
      ok: true,
      message: 'Joined waitlist successfully',
      data: {
        id: insertResult.rows[0].id,
        createdAt: insertResult.rows[0].created_at
      }
    });

  } catch (error) {
    console.error('Database error:', error);
    
    // 根据错误类型返回不同的状态码
    if (error.code === '23505') { // 唯一约束违反
      return res.status(409).json({
        ok: false,
        error: 'Email already exists in waitlist'
      });
    }
    
    if (error.code === '23514') { // 检查约束违反
      return res.status(400).json({
        ok: false,
        error: 'Invalid data provided'
      });
    }

    // 其他数据库错误
    return res.status(500).json({
      ok: false,
      error: 'Internal server error. Please try again later.'
    });
  }
}
