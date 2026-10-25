
INSERT INTO `Project` (
  `id`,
  `title`,
  `slug`,
  `description`,
  `category`,
  `liveUrl`,
  `githubUrl`,
  `imageUrl`,
  `featured`,
  `published`,
  `createdAt`,
  `updatedAt`
)
VALUES
(
  'portfolio-kora-leather',
  'Kora Leather',
  'kora-leather',
  'A website project presenting the Kora Leather brand and its products.',
  'Brand Website',
  'https://kora-leather.netlify.app',
  NULL,
  NULL,
  FALSE,
  FALSE,
  NOW(),
  NOW()
),
(
  'portfolio-aster-coffee',
  'Aster Coffee',
  'aster-coffee',
  'A website project for Aster Coffee, presenting the coffee brand through a dedicated digital experience.',
  'Cafe Website',
  'https://aster-coffee.netlify.app',
  NULL,
  NULL,
  FALSE,
  FALSE,
  NOW(),
  NOW()
),
(
  'portfolio-henok-art-studio',
  'Henok Art Studio',
  'henok-art-studio',
  'A website project presenting Henok Art Studio and its creative identity.',
  'Art Portfolio',
  'https://henok-art-studio.netlify.app',
  NULL,
  NULL,
  FALSE,
  FALSE,
  NOW(),
  NOW()
),
(
  'portfolio-nuru-dental',
  'Nuru Dental',
  'nuru-dental',
  'A website project for Nuru Dental, presenting the dental practice through a dedicated website.',
  'Healthcare Website',
  'https://nuru-dental.netlify.app',
  NULL,
  NULL,
  FALSE,
  FALSE,
  NOW(),
  NOW()
)
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `description` = VALUES(`description`),
  `category` = VALUES(`category`),
  `liveUrl` = VALUES(`liveUrl`),
  `githubUrl` = VALUES(`githubUrl`),
  `imageUrl` = VALUES(`imageUrl`),
  `featured` = VALUES(`featured`),
  `published` = VALUES(`published`),
  `updatedAt` = NOW();
