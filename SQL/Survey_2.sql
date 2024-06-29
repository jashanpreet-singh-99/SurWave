-- Insert a new survey about cars 

INSERT INTO [Surveys] ([Name], [Description], [PublishedOn], [Deadline], [Published])   
VALUES ('Favorite Cars Survey', 'Tell us your favorite types of cars.', '2023-10-15', '2023-10-31', 1);   

   

-- Get the ID of the inserted survey   
DECLARE @SurveyId INT;   
SET @SurveyId = SCOPE_IDENTITY();   

  

-- Insert the first question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What is your favorite type of car?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId1 INT;   
SET @QuestionId1 = SCOPE_IDENTITY();   

  

-- Insert options for the first question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId1, 'Sedan'),   

       (@QuestionId1, 'SUV'),   

       (@QuestionId1, 'Sports Car'), 

       (@QuestionId1, 'Truck'), 

       (@QuestionId1, 'Electric Car'), 

       (@QuestionId1, 'Luxury Car'); 

  

-- Insert the second question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Which car brand do you prefer?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId2 INT;   
SET @QuestionId2 = SCOPE_IDENTITY();   

  

-- Insert options for the second question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId2, 'Toyota'),   

       (@QuestionId2, 'Honda'),   

       (@QuestionId2, 'Ford'), 

       (@QuestionId2, 'Tesla'), 

       (@QuestionId2, 'BMW'), 

       (@QuestionId2, 'Mercedes-Benz'); 

  

-- Insert the third question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'How often do you purchase a new car?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId3 INT;   
SET @QuestionId3 = SCOPE_IDENTITY();   

  

-- Insert options for the third question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId3, 'Every few years'),   

       (@QuestionId3, 'Once a decade'),   

       (@QuestionId3, 'Only when necessary'); 

  
-- Insert the fourth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Which color do you prefer for your car?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId4 INT;   
SET @QuestionId4 = SCOPE_IDENTITY();   

  

-- Insert options for the fourth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId4, 'Red'),   

       (@QuestionId4, 'Blue'),   

       (@QuestionId4, 'Black'), 

       (@QuestionId4, 'White'), 

       (@QuestionId4, 'Silver'), 

       (@QuestionId4, 'Other (please specify)'); 

  

-- Insert the fifth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What features are important in a car to you? (Select all that apply)');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId5 INT;   
SET @QuestionId5 = SCOPE_IDENTITY();   

  

-- Insert options for the fifth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId5, 'Fuel efficiency'),   

       (@QuestionId5, 'Safety features'),   

       (@QuestionId5, 'Technology and infotainment'), 

       (@QuestionId5, 'Performance'), 

       (@QuestionId5, 'Cargo space'), 

       (@QuestionId5, 'Environmental impact'); 

  

-- Insert the sixth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What is your dream car?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId6 INT;   
SET @QuestionId6 = SCOPE_IDENTITY();   

  

-- Insert options for the sixth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId6, 'Ferrari'),   
       (@QuestionId6, 'Lamborghini'),   
       (@QuestionId6, 'Porsche'), 
       (@QuestionId6, 'Rolls-Royce'), 
       (@QuestionId6, 'Other (please specify)'); 

  

-- Insert the seventh question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'Do you own a car?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId7 INT;   
SET @QuestionId7 = SCOPE_IDENTITY();   

  

-- Insert options for the seventh question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId7, 'Yes'),   

       (@QuestionId7, 'No'); 

  

-- Insert the eighth question for the survey   
INSERT INTO [Questions] ([SurveyId], [QuestionText])   
VALUES (@SurveyId, 'What do you use your car for most?');   

   

-- Get the ID of the inserted question   
DECLARE @QuestionId8 INT;   
SET @QuestionId8 = SCOPE_IDENTITY();   

  

-- Insert options for the eighth question   
INSERT INTO [Option] ([QuestionId], [OptionText])   
VALUES (@QuestionId8, 'Daily commute'),   

       (@QuestionId8, 'Weekend drives'),   

       (@QuestionId8, 'Family trips'), 

       (@QuestionId8, 'Business purposes'); 
