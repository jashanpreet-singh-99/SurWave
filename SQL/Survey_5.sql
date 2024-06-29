-- Insert a new survey about cars 

INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])   
VALUES ('Anime survey', 'Tell us your passion for anime.', '2023-10-15', '2023-10-25', 1);   

   

-- Get the ID of the inserted survey   
DECLARE @SurveyId INT;   
SET @SurveyId = SCOPE_IDENTITY();   

  

-- Insert the first question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What is your favorite anime?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId1 INT;   
SET @QuestionId1 = SCOPE_IDENTITY();   

  

-- Insert options for the first question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId1, 'One Piece'),   

       (@QuestionId1, 'Naruto'),   

       (@QuestionId1, 'Bleach'), 

       (@QuestionId1, 'Death Note'), 

       (@QuestionId1, 'Dragon Ball'), 

       (@QuestionId1, 'Full Metal Alchemist'),
       
       (@QuestionId1, 'HXH'),

       (@QuestionId1, 'Evangelion'),
       
       (@QuestionId1, 'Steins Gate'),
       
       (@QuestionId1, 'Gintama'),
       
       (@QuestionId1, 'Other'); 

  

-- Insert the second question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'How much time do you spend watching anime in a day?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId2 INT;   
SET @QuestionId2 = SCOPE_IDENTITY();   

  

-- Insert options for the second question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId2, 'less than 1 hr'),   

       (@QuestionId2, '1-3 hrs'),   

       (@QuestionId2, '3+ hrs');

  

-- Insert the third question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Do you prefer seasonal anime or weekly anime');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId3 INT;   
SET @QuestionId3 = SCOPE_IDENTITY();   

  

-- Insert options for the third question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId3, 'Seasonal'),   

       (@QuestionId3, 'Weekly');

  
-- Insert the fourth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What is your age group');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId4 INT;   
SET @QuestionId4 = SCOPE_IDENTITY();   

  

-- Insert options for the fourth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId4, '15-20'),   

       (@QuestionId4, '21-25'),   

       (@QuestionId4, '26-30'), 

       (@QuestionId4, '31-40'),
       
       (@QuestionId4, '40+'); 

  

-- Insert the fifth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'How many anime have you watched?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId5 INT;   
SET @QuestionId5 = SCOPE_IDENTITY();   

  

-- Insert options for the fifth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId5, '1-10'),   

       (@QuestionId5, '10-20'),
       
       (@QuestionId5, '20-30'),
       
       (@QuestionId5, '30-40'),
       
       (@QuestionId5, '40-50'),
       
       (@QuestionId5, 'lost count'); 

  

-- Insert the sixth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Is the one piece real?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId6 INT;   
SET @QuestionId6 = SCOPE_IDENTITY();   

  

-- Insert options for the sixth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId6, 'Yes'),   
       (@QuestionId6, 'Ofcourse'),
       (@QuestionId6, 'Can we get much higher'); 

  

-- Insert the seventh question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Would you classify yourself as a weeb?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId7 INT;   
SET @QuestionId7 = SCOPE_IDENTITY();   

  

-- Insert options for the seventh question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId7, 'Yes'),   

       (@QuestionId7, 'No'); 

