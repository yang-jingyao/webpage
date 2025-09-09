-- 创建 waitlist_submissions 表
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  school_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_email 
ON waitlist_submissions(email);

CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_created_at 
ON waitlist_submissions(created_at);

-- 添加注释
COMMENT ON TABLE waitlist_submissions IS '存储等待列表提交数据的表';
COMMENT ON COLUMN waitlist_submissions.id IS '主键，自增ID';
COMMENT ON COLUMN waitlist_submissions.full_name IS '用户全名';
COMMENT ON COLUMN waitlist_submissions.email IS '用户邮箱地址，唯一';
COMMENT ON COLUMN waitlist_submissions.school_name IS '学校名称';
COMMENT ON COLUMN waitlist_submissions.created_at IS '创建时间，带时区';
