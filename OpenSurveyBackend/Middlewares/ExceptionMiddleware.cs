using System.Net;
using WebAPI.Errors;

namespace WebAPI.Middlewares
{
    public class ExceptionMiddleware  //this class is for our custom exception handling
    //We use this class at the top of our program file and everything goes through this try catch block first!
    {
        private readonly RequestDelegate next;

        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IWebHostEnvironment env;

        private readonly WebApplication app;


        public ExceptionMiddleware(RequestDelegate next,
                                   ILogger<ExceptionMiddleware> logger,
                                   IWebHostEnvironment env) 
        {
            this.logger = logger;
            this.env = env;
            this.next = next;

        }

        public async Task Invoke(HttpContext context) {
            try {
                await next(context);

            } catch(Exception ex) {
                ApiError response;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                string message;
                var exceptionType = ex.GetType();

                if(exceptionType == typeof(UnauthorizedAccessException)) {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not authorized!";
                } else {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "Some unknown error occured";
                }

                if(env.IsDevelopment()) {

                    response = new ApiError((int)statusCode, ex.Message, ex.StackTrace.ToString());
                } else {

                     response = new ApiError((int)statusCode, message);
                }
                logger.LogError(ex, ex.Message);  //this isrequired to log error in terminal while in prod mode!
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(response.ToString());

            }
        }
        
    }
}