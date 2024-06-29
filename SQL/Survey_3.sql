-- Insert a new survey about cars 

INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])   
VALUES ('Favorite Games Survey', 'Tell us your favorite games!', '2023-10-15', '2023-10-18', 1);   

   

-- Get the ID of the inserted survey   
DECLARE @SurveyId INT;   
SET @SurveyId = SCOPE_IDENTITY();   

  

-- Insert the first question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What is your favorite console?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId1 INT;   
SET @QuestionId1 = SCOPE_IDENTITY();   

  

-- Insert options for the first question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId1, 'Playstation 5'),   

       (@QuestionId1, 'Nintendo Switch'),   

       (@QuestionId1, 'Xbox'), 

       (@QuestionId1, 'Mobile'), 

       (@QuestionId1, 'PC');

  

-- Insert the second question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What types of games do you play?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId2 INT;   
SET @QuestionId2 = SCOPE_IDENTITY();   

  

-- Insert options for the second question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId2, 'FPS'),   

       (@QuestionId2, 'RPG'),   

       (@QuestionId2, 'Tell-Tale'), 

       (@QuestionId2, '2D side scrollers'), 

       (@QuestionId2, 'MMO'), 

       (@QuestionId2, 'Battle-Royale'); 

  

-- Insert the third question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'How many hours a day do you play?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId3 INT;   
SET @QuestionId3 = SCOPE_IDENTITY();   

  

-- Insert options for the third question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId3, 'less than 1 hr'),   

       (@QuestionId3, '1-3 hrs'),   

       (@QuestionId3, '3+ hrs'); 

  
-- Insert the fourth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Which type of screen do you prefer to play games on?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId4 INT;   
SET @QuestionId4 = SCOPE_IDENTITY();   

  

-- Insert options for the fourth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId4, 'TV'),   

       (@QuestionId4, 'Monitor'),   

       (@QuestionId4, 'Handheld device'); 

  

-- Insert the fifth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Which of the following is more important to you?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId5 INT;   
SET @QuestionId5 = SCOPE_IDENTITY();   

  

-- Insert options for the fifth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId5, 'Frame Rate'),   

       (@QuestionId5, 'Resolution'),   

       (@QuestionId5, 'Both Equally Important');