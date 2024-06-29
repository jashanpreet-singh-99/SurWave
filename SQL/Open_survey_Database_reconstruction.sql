-- Remove everything from tables
TRUNCATE TABLE [SurveyResponses]
TRUNCATE TABLE [SurveyUserGroupRelations]
TRUNCATE TABLE [UserGroupsRelations]

DELETE FROM [Option] WHERE Id > 0;
DELETE FROM [Questions] WHERE Id > 0;
DELETE FROM [Surveys] WHERE Id > 0;
DELETE FROM [UserGroups] WHERE Id > 0;
DELETE FROM [Users] WHERE Id > 0;

-- Foreign Key relation so truncate will not work on these
-- TRUNCATE TABLE [Option]
-- TRUNCATE TABLE [Questions]
-- TRUNCATE TABLE [Surveys]
-- TRUNCATE TABLE [UserGroups]
-- TRUNCATE TABLE [Users]

-- Insert Admin with pwd Admin@123 and other users with password User@123
INSERT INTO [Users] VALUES ('Administrator', 0x6277D10B50A93108DC5E33E3FB18658B9E9D2DCB49414E52EA7B328410D432A1ECF6E5B419D71BF839F00AE3B5BDAB3BACA918E12A491EA478E402FE4AA5A497, 0xDAB0E91A7CAD8950B86393E38618CA9AF5DC297BE626A3BCBEFB6C6810F7425BBB2B09E5A47794BD4A4CA4A26004BFC13650618E5D3EF71AC2D0DA4DEBB0600E4E27FDEF22C9EA0F96928F8F6CB205266665409716D5AC2CAB6C16603114BA972C52FD66676438F47A46DF4DA141F6590540630386DAF735FD6F8DF50E358764, 'Admin', 1, 'Administrator');
INSERT INTO [Users] VALUES ('open.survey@hottempmail.cc', 0x6F3345BFDD5FE108E35A06AC4DC5ECDB21710E0E72B274199A92EC3BCBC2851009FC0EA47835974506B2B910D75D749AD26DBFD75C7F9956659D79677E3AB04A, 0xA8B968C18CE5B68CC2AC8F73AC862A3A3214BACFF5B216C3BBE14F620ED8A8D1A9C947845290F301B9037DEAF58F2300AED0D0471DA8671B20EEC8A463B86471EDD20B4BD1E7F9688D26002D729E0C87814E49703648C42C4AD99E646EC281A22482520EA1FD5D693F4B8EBA80313E41D2D5F22302D68AFF7BE4C91010FF6179, 'User', 1, 'Robin');

-- Create new UserGroups
INSERT INTO [UserGroups] VALUES ('Group-1')
INSERT INTO [UserGroups] VALUES ('Group-2')
INSERT INTO [UserGroups] VALUES ('Group-3')

GO
-- User and UserGroups (Add user to UserGroups)
CREATE PROCEDURE InsertUserGroupRelation
    @UserEmail VARCHAR(255),
    @GroupName VARCHAR(255)
AS
BEGIN
    DECLARE @UserID INT;
    SELECT @UserID = [Id] FROM [Users] WHERE [Email] = @UserEmail;

    DECLARE @UserGID INT;
    SELECT @UserGID = [Id] FROM [UserGroups] WHERE [GroupName] = @GroupName;

    INSERT INTO [UserGroupsRelations] (UserId, UserGroupId)
    VALUES (@UserID, @UserGID);
END;
GO
EXEC InsertUserGroupRelation @UserEmail = 'open.survey@hottempmail.cc', @GroupName = 'Team-NG';
EXEC InsertUserGroupRelation @UserEmail = 'open.survey@hottempmail.cc', @GroupName = 'Team-SGD';
EXEC InsertUserGroupRelation @UserEmail = 'open.survey@hottempmail.cc', @GroupName = 'Team-Apple-A';
GO

--
-- Run Survey_1 and Survey_2 before this.
--

-- Survey and UserGroups (Add usergroups to survey)
CREATE PROCEDURE InsertSurveyUserGroupRelation
    @surveyName VARCHAR(255),
    @GroupName VARCHAR(255)
AS
BEGIN
    DECLARE @sID INT;
    SELECT @sID = [Id] FROM [Surveys] WHERE [Name] = @SurveyName;

    DECLARE @UserGID INT;
    SELECT @UserGID = [Id] FROM [UserGroups] WHERE [GroupName] = @GroupName;

    INSERT INTO [SurveyUserGroupRelations] (SurveyId, UserGroupId)
    VALUES (@sID, @UserGID);
END;
GO
EXEC InsertSurveyUserGroupRelation @surveyName = 'Favorite Ice Cream Survey', @GroupName = 'Team-NG';
EXEC InsertSurveyUserGroupRelation @surveyName = 'Favorite Cars Survey', @GroupName = 'Team-NG';
EXEC InsertSurveyUserGroupRelation @surveyName = 'Favorite Ice Cream Survey', @GroupName = 'Team-SGD';
EXEC InsertSurveyUserGroupRelation @surveyName = 'Favorite Cars Survey', @GroupName = 'Team-Apple-A';
GO
