create table checklist(
    category varchar(100),--supposed to represent the semester for pregrancy
    actualitem varchar(255)--the thing ought todo;
);


CREATE TABLE checklist (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(100), -- To store the username of the user
    category VARCHAR(100), -- To represent the semester for pregnancy
    actualitem VARCHAR(255), -- The thing ought to do
    checkedState INT -- To store the checked state (1 for checked, 0 for unchecked)
);



-- Inserting 'First Trimester' checklist
INSERT INTO checklist (category, actualitem) VALUES
('First Trimester', 'Take prenatal vitamins'),
('First Trimester', 'Schedule first prenatal appointment'),
('First Trimester', 'Start tracking symptoms');

-- Inserting 'Second Trimester' checklist
INSERT INTO checklist (category, actualitem) VALUES
('Second Trimester', 'Attend regular prenatal check-ups'),
('Second Trimester', 'Consider birthing classes'),
('Second Trimester', 'Plan for baby''s arrival');

-- Inserting 'Third Trimester' checklist
INSERT INTO checklist (category, actualitem) VALUES
('Third Trimester', 'Pack hospital bag'),
('Third Trimester', 'Finalize birth plan'),
('Third Trimester', 'Install car seat');

-- Inserting 'Newborn Stage' checklist
INSERT INTO checklist (category, actualitem) VALUES
('Newborn Stage', 'Establish feeding routine (breastfeeding or formula)'),
('Newborn Stage', 'Ensure baby sleeps on their back'),
('Newborn Stage', 'Provide tummy time');

-- Inserting 'Infant Stage (0-12 months)' checklist
INSERT INTO checklist (category, actualitem) VALUES
('Infant Stage (0-12 months)', 'Monitor developmental milestones (rolling, crawling, etc.)'),
('Infant Stage (0-12 months)', 'Introduce solid foods'),
('Infant Stage (0-12 months)', 'Encourage babbling and language development');

-- Inserting 'Toddler Stage (1-3 years)' checklist
INSERT INTO checklist (category, actualitem) VALUES
('Toddler Stage (1-3 years)', 'Encourage walking and exploration'),
('Toddler Stage (1-3 years)', 'Promote fine motor skills (stacking blocks, using utensils)'),
('Toddler Stage (1-3 years)', 'Introduce social interaction (playdates)');

-- Inserting 'Preschooler Stage (3-5 years)' checklist
INSERT INTO checklist (category, actualitem) VALUES
('Preschooler Stage (3-5 years)', 'Prepare for preschool or daycare'),
('Preschooler Stage (3-5 years)', 'Foster independence in self-care tasks'),
('Preschooler Stage (3-5 years)', 'Support early literacy and numeracy');

-- Inserting 'Key Achievements' checklist
INSERT INTO checklist (category, actualitem) VALUES
('Key Achievements', 'Smiling and cooing (2-3 months)'),
('Key Achievements', 'Rolling over (4-6 months)'),
('Key Achievements', 'Sitting up without support (6-8 months)'),
('Key Achievements', 'Crawling (8-10 months)'),
('Key Achievements', 'First words (around 1 year)'),
('Key Achievements', 'Walking (around 1-2 years)'),
('Key Achievements', 'Beginning to use utensils (18-24 months)'),
('Key Achievements', 'Engaging in imaginative play (2-3 years)');
