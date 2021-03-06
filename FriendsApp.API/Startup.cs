﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FriendsApp.API.Data;
using FriendsApp.API.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using FriendsApp.API.Repository;
using AutoMapper;

namespace FriendsApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Install Microsoft.EntityFrameworkCore.Sqlite @Pedro
            services.AddDbContext<DataContext>(x => x.UseSqlite(Configuration.GetConnectionString("DefaultConnection"))); //Configuration is appsettings.json
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                    //The following commands was because postman was throwing looping erros (photo/user)
                    .AddJsonOptions(opt => {
                        opt.SerializerSettings.ReferenceLoopHandling = 
                            Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    });

            //Cors origin @Pedro
            services.AddCors();
            //Add for dependency injection
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IFriendsRepository, FriendsRepository>();
            services.AddAutoMapper();
            //Populate database
            services.AddTransient<Seed>();
            //Add Authentication as a service @Pedro
            //After, we have to tell the application about this service. It is done on Configure method below
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddScoped<LogUserActivity>();

            //Cloudinary images storage: @pedro
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, Seed seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //Code to handle exception globally. No need to put try/catch everywhere in the code
                //Need to change application from Development to Production in launchSettings.json
                app.UseExceptionHandler(
                    builder => {
                        builder.Run(async context => {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                            var error = context.Features.Get<IExceptionHandlerFeature>();

                            if(error != null)
                            {
                                context.Response.AddApplicationError(error.Error.Message);
                                await context.Response.WriteAsync(error.Error.Message);
                            }
                        });
                    }
                );
                //app.UseHsts(); commented because we are not concerned with security for now.
            }
            //seeder.SeedUsers(); // Call when execute the app in order to seed database
            //app.UseHttpsRedirection(); commented because we are not concerned with security for now.
            app.UseCors(x=> x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); //Allow use cors @Pedro
            app.UseAuthentication(); //This is added after AddAuthentication above: Middleware
            app.UseMvc();
        }
    }
}
