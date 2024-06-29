using Microsoft.EntityFrameworkCore;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Data;

public class DataContext: DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Survey> Surveys { get; set; }
    public DbSet<Question> Questions  { get; set; }
    public DbSet<Option> Option  { get; set; }
    public DbSet<UserGroup> UserGroups { get; set; }
    public DbSet<UserGroupRelation> UserGroupsRelations { get; set; }
    public DbSet<SurveyUserGroupRelation> SurveyUserGroupRelations { get; set; }
    public DbSet<SurveyResponse> SurveyResponses { get; set; }
}
