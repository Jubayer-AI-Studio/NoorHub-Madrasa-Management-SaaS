import { pgTable, uuid, text, varchar, integer, decimal, boolean, timestamp, date, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// ENUMS
// ============================================

export const institutionTypeEnum = pgEnum('institution_type', [
  'qawmi',     // কওমি মাদরাসা
  'alia',      // আলিয়া মাদরাসা
  'hifz',      // হিফজুল কুরআন
  'general',   // সাধারণ স্কুল/কলেজ
]);

export const userRoleEnum = pgEnum('user_role', [
  'super_admin',   // নূরহাব সুপার অ্যাডমিন
  'principal',     // মুহতামিম / প্রধান শিক্ষক
  'teacher',       // শিক্ষক / হুজুর
  'student',       // ছাত্র
  'parent',        // অভিভাবক
]);

export const attendanceStatusEnum = pgEnum('attendance_status', [
  'present',  // উপস্থিত
  'absent',   // অনুপস্থিত
  'leave',    // ছুটিতে
  'late',     // দেরিতে এসেছে
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'cash',    // নগদ
  'bkash',   // বিকাশ
  'nagad',   // নগদ
  'rocket',  // রকেট
  'bank',    // ব্যাংক
  'other',   // অন্যান্য
]);

export const feeTypeEnum = pgEnum('fee_type', [
  'monthly',    // মাসিক বেতন
  'admission',  // ভর্তি ফি
  'exam',       // পরীক্ষা ফি
  'boarding',   // বোর্ডিং ফি
  'other',      // অন্যান্য
]);

export const donationTypeEnum = pgEnum('donation_type', [
  'general',      // সাধারণ অনুদান
  'zakat',        // যাকাত
  'lillah',       // লিল্লাহ
  'sadaqah',      // সাদাকাহ
  'orphan_fund',  // এতিম ফান্ড
  'construction', // নির্মাণ ফান্ড
]);

export const studentStatusEnum = pgEnum('student_status', [
  'active',     // চলমান
  'graduated',  // পাস করেছে
  'dropped',    // ছেড়ে দিয়েছে
  'transferred',// ট্রান্সফার
]);

// ============================================
// TABLE: INSTITUTIONS (প্রতিষ্ঠান)
// ============================================
export const institutions = pgTable('institutions', {
  id:              uuid('id').defaultRandom().primaryKey(),
  name:            varchar('name', { length: 255 }).notNull(),
  nameBn:          varchar('name_bn', { length: 255 }),
  code:            varchar('code', { length: 50 }).unique(),
  type:            institutionTypeEnum('type').notNull().default('qawmi'),
  principalName:   varchar('principal_name', { length: 255 }),
  phone:           varchar('phone', { length: 20 }),
  whatsapp:        varchar('whatsapp', { length: 20 }),
  email:           varchar('email', { length: 255 }),
  address:         text('address'),
  division:        varchar('division', { length: 100 }),
  district:        varchar('district', { length: 100 }),
  upazila:         varchar('upazila', { length: 100 }),
  latitude:        decimal('latitude', { precision: 10, scale: 7 }),
  longitude:       decimal('longitude', { precision: 10, scale: 7 }),
  established:     integer('established'),          // প্রতিষ্ঠাকাল (বছর)
  isVerified:      boolean('is_verified').default(false),
  verifiedBadge:   boolean('verified_badge').default(false),
  ratingScore:     decimal('rating_score', { precision: 3, scale: 2 }).default('0'),
  totalStudents:   integer('total_students').default(0),
  totalTeachers:   integer('total_teachers').default(0),
  logoUrl:         text('logo_url'),
  isActive:        boolean('is_active').default(true),
  createdAt:       timestamp('created_at').defaultNow(),
  updatedAt:       timestamp('updated_at').defaultNow(),
});

// ============================================
// TABLE: USERS (সব ধরনের ব্যবহারকারী)
// ============================================
export const users = pgTable('users', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id),
  role:            userRoleEnum('role').notNull(),
  name:            varchar('name', { length: 255 }).notNull(),
  phone:           varchar('phone', { length: 20 }).unique(),
  passwordHash:    varchar('password_hash', { length: 255 }),
  photoUrl:        text('photo_url'),
  isActive:        boolean('is_active').default(true),
  lastLogin:       timestamp('last_login'),
  createdAt:       timestamp('created_at').defaultNow(),
  updatedAt:       timestamp('updated_at').defaultNow(),
});

// ============================================
// TABLE: CLASSES (শ্রেণি)
// ============================================
export const classes = pgTable('classes', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  name:            varchar('name', { length: 100 }).notNull(),   // e.g. "মিজান", "দাখিল ৯ম"
  nameBn:          varchar('name_bn', { length: 100 }),
  section:         varchar('section', { length: 50 }),           // শাখা (ক, খ, A, B)
  classTeacherId:  uuid('class_teacher_id').references(() => users.id),
  academicYear:    integer('academic_year').notNull(),
  order:           integer('order').default(0),                  // ক্লাসের ক্রম
  isActive:        boolean('is_active').default(true),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: STUDENTS (ছাত্র)
// ============================================
export const students = pgTable('students', {
  id:              uuid('id').defaultRandom().primaryKey(),
  userId:          uuid('user_id').references(() => users.id),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  classId:         uuid('class_id').references(() => classes.id),
  admissionNumber: varchar('admission_number', { length: 50 }).unique(),
  rollNumber:      varchar('roll_number', { length: 20 }),
  name:            varchar('name', { length: 255 }).notNull(),
  fatherName:      varchar('father_name', { length: 255 }),
  motherName:      varchar('mother_name', { length: 255 }),
  dateOfBirth:     date('date_of_birth'),
  bloodGroup:      varchar('blood_group', { length: 5 }),
  gender:          varchar('gender', { length: 10 }).default('male'),
  address:         text('address'),
  isBoarding:      boolean('is_boarding').default(false),        // আবাসিক?
  photoUrl:        text('photo_url'),
  admissionDate:   date('admission_date'),
  status:          studentStatusEnum('status').default('active'),
  // অভিভাবকের তথ্য
  parentName:      varchar('parent_name', { length: 255 }),
  parentPhone:     varchar('parent_phone', { length: 20 }),
  parentPhone2:    varchar('parent_phone_2', { length: 20 }),    // বিকল্প নম্বর
  parentRelation:  varchar('parent_relation', { length: 50 }),   // পিতা / মাতা / অভিভাবক
  createdAt:       timestamp('created_at').defaultNow(),
  updatedAt:       timestamp('updated_at').defaultNow(),
});

// ============================================
// TABLE: TEACHERS (শিক্ষক)
// ============================================
export const teachers = pgTable('teachers', {
  id:              uuid('id').defaultRandom().primaryKey(),
  userId:          uuid('user_id').references(() => users.id),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  name:            varchar('name', { length: 255 }).notNull(),
  phone:           varchar('phone', { length: 20 }),
  specialization:  varchar('specialization', { length: 255 }),   // বিশেষত্ব
  salary:          decimal('salary', { precision: 10, scale: 2 }),
  joinDate:        date('join_date'),
  isActive:        boolean('is_active').default(true),
  photoUrl:        text('photo_url'),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: ATTENDANCE (হাজিরা)
// ============================================
export const attendance = pgTable('attendance', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  studentId:       uuid('student_id').references(() => students.id).notNull(),
  classId:         uuid('class_id').references(() => classes.id),
  date:            date('date').notNull(),
  status:          attendanceStatusEnum('status').default('present'),
  takenBy:         uuid('taken_by').references(() => users.id),  // কোন শিক্ষক নিয়েছেন
  note:            text('note'),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: LEAVES (ছুটি)
// ============================================
export const leaves = pgTable('leaves', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  studentId:       uuid('student_id').references(() => students.id).notNull(),
  fromDate:        date('from_date').notNull(),
  toDate:          date('to_date').notNull(),
  reason:          varchar('reason', { length: 100 }),
  note:            text('note'),
  approvedBy:      uuid('approved_by').references(() => users.id),
  status:          varchar('status', { length: 20 }).default('approved'), // approved / rejected / pending
  notificationSent: boolean('notification_sent').default(false),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: EXAMS (পরীক্ষা)
// ============================================
export const exams = pgTable('exams', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  name:            varchar('name', { length: 255 }).notNull(),   // পরীক্ষার নাম
  academicYear:    integer('academic_year').notNull(),
  startDate:       date('start_date'),
  endDate:         date('end_date'),
  isPublished:     boolean('is_published').default(false),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: EXAM RESULTS (রেজাল্ট)
// ============================================
export const examResults = pgTable('exam_results', {
  id:              uuid('id').defaultRandom().primaryKey(),
  examId:          uuid('exam_id').references(() => exams.id).notNull(),
  studentId:       uuid('student_id').references(() => students.id).notNull(),
  classId:         uuid('class_id').references(() => classes.id),
  subject:         varchar('subject', { length: 100 }).notNull(),
  fullMarks:       integer('full_marks').default(100),
  passMarks:       integer('pass_marks').default(33),
  obtainedMarks:   decimal('obtained_marks', { precision: 5, scale: 2 }),
  grade:           varchar('grade', { length: 30 }),
  position:        integer('position'),                          // মেধাক্রম
  isPassed:        boolean('is_passed').default(true),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: HIFZ TRACKING (হিফজ অগ্রগতি)
// ============================================
export const hifzTracking = pgTable('hifz_tracking', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  studentId:       uuid('student_id').references(() => students.id).notNull(),
  teacherId:       uuid('teacher_id').references(() => teachers.id),
  date:            date('date').notNull(),
  sabaqSurah:      varchar('sabaq_surah', { length: 100 }),      // সবক — কোন সূরা/পারা
  sabaqVerses:     varchar('sabaq_verses', { length: 50 }),      // আয়াত সংখ্যা
  sabqiSurah:      varchar('sabqi_surah', { length: 100 }),      // সবকি
  manzilSurah:     varchar('manzil_surah', { length: 100 }),     // আমুখতা/মনজিল
  completedParas:  integer('completed_paras').default(0),        // মোট কত পারা হয়েছে
  teacherNote:     text('teacher_note'),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: FEES (ফি আদায়)
// ============================================
export const fees = pgTable('fees', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  studentId:       uuid('student_id').references(() => students.id).notNull(),
  feeType:         feeTypeEnum('fee_type').default('monthly'),
  amount:          decimal('amount', { precision: 10, scale: 2 }).notNull(),
  month:           integer('month'),                             // ১-১২
  year:            integer('year'),
  paymentMethod:   paymentMethodEnum('payment_method').default('cash'),
  transactionId:   varchar('transaction_id', { length: 100 }),  // বিকাশ/নগদ ট্র্যানজেকশন নম্বর
  collectedBy:     uuid('collected_by').references(() => users.id),
  receiptNumber:   varchar('receipt_number', { length: 50 }).unique(),
  note:            text('note'),
  paidAt:          timestamp('paid_at').defaultNow(),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: DONATIONS (অনুদান)
// ============================================
export const donations = pgTable('donations', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  donorName:       varchar('donor_name', { length: 255 }),
  donorPhone:      varchar('donor_phone', { length: 20 }),
  amount:          decimal('amount', { precision: 10, scale: 2 }).notNull(),
  donationType:    donationTypeEnum('donation_type').default('general'),
  paymentMethod:   paymentMethodEnum('payment_method').default('cash'),
  transactionId:   varchar('transaction_id', { length: 100 }),
  purpose:         text('purpose'),                              // উদ্দেশ্য
  impactUpdate:    text('impact_update'),                        // দান কোথায় ব্যবহার হয়েছে
  impactPhotoUrl:  text('impact_photo_url'),
  trackingCode:    varchar('tracking_code', { length: 50 }).unique(), // ডোনার পোর্টালের লিংক কোড
  donatedAt:       timestamp('donated_at').defaultNow(),
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// TABLE: NOTIFICATIONS (নোটিফিকেশন লগ)
// ============================================
export const notifications = pgTable('notifications', {
  id:              uuid('id').defaultRandom().primaryKey(),
  institutionId:   uuid('institution_id').references(() => institutions.id).notNull(),
  recipientPhone:  varchar('recipient_phone', { length: 20 }),
  channel:         varchar('channel', { length: 20 }),           // sms / whatsapp / push
  message:         text('message').notNull(),
  sentAt:          timestamp('sent_at'),
  isDelivered:     boolean('is_delivered').default(false),
  type:            varchar('type', { length: 50 }),              // attendance / result / fee / leave
  createdAt:       timestamp('created_at').defaultNow(),
});

// ============================================
// RELATIONS
// ============================================
export const institutionsRelations = relations(institutions, ({ many }) => ({
  users:      many(users),
  classes:    many(classes),
  students:   many(students),
  teachers:   many(teachers),
  fees:       many(fees),
  donations:  many(donations),
  exams:      many(exams),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  institution: one(institutions, { fields: [students.institutionId], references: [institutions.id] }),
  class:       one(classes, { fields: [students.classId], references: [classes.id] }),
  attendance:  many(attendance),
  fees:        many(fees),
  results:     many(examResults),
  hifzEntries: many(hifzTracking),
  leaves:      many(leaves),
}));
