USE [master]
GO
/****** Object:  Database [iFoody2012]    Script Date: 10-Jan-18 4:24:59 PM ******/
CREATE DATABASE [iFoody2012]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'iFoody2012', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS01\MSSQL\DATA\iFoody2012.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'iFoody2012_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.SQLEXPRESS01\MSSQL\DATA\iFoody2012_log.ldf' , SIZE = 768KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
GO
ALTER DATABASE [iFoody2012] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [iFoody2012].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [iFoody2012] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [iFoody2012] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [iFoody2012] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [iFoody2012] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [iFoody2012] SET ARITHABORT OFF 
GO
ALTER DATABASE [iFoody2012] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [iFoody2012] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [iFoody2012] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [iFoody2012] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [iFoody2012] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [iFoody2012] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [iFoody2012] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [iFoody2012] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [iFoody2012] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [iFoody2012] SET  DISABLE_BROKER 
GO
ALTER DATABASE [iFoody2012] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [iFoody2012] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [iFoody2012] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [iFoody2012] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [iFoody2012] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [iFoody2012] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [iFoody2012] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [iFoody2012] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [iFoody2012] SET  MULTI_USER 
GO
ALTER DATABASE [iFoody2012] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [iFoody2012] SET DB_CHAINING OFF 
GO
ALTER DATABASE [iFoody2012] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [iFoody2012] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [iFoody2012]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categories](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Categories] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[ReviewContent] [nvarchar](max) NOT NULL,
	[Rating] [float] NULL,
	[Date] [datetime] NOT NULL,
	[UserId] [uniqueidentifier] NULL,
	[ProductId] [uniqueidentifier] NULL,
	[StoreId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FavoriteLists]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FavoriteLists](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[StoreId] [uniqueidentifier] NULL,
	[ProductId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_FavoriteLists] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Path] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductImages]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductImages](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[ProductId] [uniqueidentifier] NOT NULL,
	[ImageId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_ProductImages_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Products]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Price] [decimal](8, 0) NOT NULL,
	[Description] [nvarchar](max) NULL,
	[CategoryId] [uniqueidentifier] NULL,
	[StoreId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reviews](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[ReviewContent] [nvarchar](max) NOT NULL,
	[Rating] [float] NOT NULL,
	[Date] [datetime] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[ProductId] [uniqueidentifier] NULL,
	[StoreId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Reviews] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[StoreImages]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[StoreImages](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[StoreId] [uniqueidentifier] NOT NULL,
	[ImageId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_StoreImages_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Stores]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Stores](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Rating] [float] NULL,
	[OpenHour] [time](0) NOT NULL,
	[CloseHour] [time](0) NOT NULL,
	[LowestPrice] [decimal](8, 0) NULL,
	[HighestPrice] [decimal](8, 0) NULL,
	[Description] [nvarchar](max) NULL,
	[RegistrationDate] [date] NOT NULL,
	[Address] [nvarchar](max) NOT NULL,
	[District] [nvarchar](50) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[CategoryId] [uniqueidentifier] NULL,
	[UserId] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Stores] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tokens]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tokens](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[AuthToken] [nvarchar](250) NOT NULL,
	[IssuedOn] [datetime] NOT NULL,
	[ExpiresOn] [datetime] NOT NULL,
 CONSTRAINT [PK_Tokens] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserImages]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserImages](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[ImageId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_UserImages_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10-Jan-18 4:24:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [uniqueidentifier] ROWGUIDCOL  NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[Gender] [tinyint] NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL,
	[Birthday] [date] NULL,
	[IsAdmin] [bit] NOT NULL,
	[HasStore] [bit] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Categories] ADD  CONSTRAINT [DF_Categories_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Comments] ADD  CONSTRAINT [DF_Comments_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[FavoriteLists] ADD  CONSTRAINT [DF_FavoriteLists_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Images] ADD  CONSTRAINT [DF_Images_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[ProductImages] ADD  CONSTRAINT [DF_ProductImages_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Products] ADD  CONSTRAINT [DF_Products_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Reviews] ADD  CONSTRAINT [DF_Reviews_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[StoreImages] ADD  CONSTRAINT [DF_StoreImages_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Stores] ADD  CONSTRAINT [DF_Stores_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[UserImages] ADD  CONSTRAINT [DF_UserImages_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Id]  DEFAULT (newid()) FOR [Id]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Products]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Stores]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Users]
GO
ALTER TABLE [dbo].[FavoriteLists]  WITH CHECK ADD  CONSTRAINT [FK_FavoriteLists_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[FavoriteLists] CHECK CONSTRAINT [FK_FavoriteLists_Products]
GO
ALTER TABLE [dbo].[FavoriteLists]  WITH CHECK ADD  CONSTRAINT [FK_FavoriteLists_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([Id])
GO
ALTER TABLE [dbo].[FavoriteLists] CHECK CONSTRAINT [FK_FavoriteLists_Stores]
GO
ALTER TABLE [dbo].[FavoriteLists]  WITH CHECK ADD  CONSTRAINT [FK_FavoriteLists_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[FavoriteLists] CHECK CONSTRAINT [FK_FavoriteLists_Users]
GO
ALTER TABLE [dbo].[ProductImages]  WITH CHECK ADD  CONSTRAINT [FK_ProductImages_Images] FOREIGN KEY([ImageId])
REFERENCES [dbo].[Images] ([Id])
GO
ALTER TABLE [dbo].[ProductImages] CHECK CONSTRAINT [FK_ProductImages_Images]
GO
ALTER TABLE [dbo].[ProductImages]  WITH CHECK ADD  CONSTRAINT [FK_ProductImages_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[ProductImages] CHECK CONSTRAINT [FK_ProductImages_Products]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Categories]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([Id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Stores]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Products] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Products] ([Id])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Products]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([Id])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Stores]
GO
ALTER TABLE [dbo].[Reviews]  WITH CHECK ADD  CONSTRAINT [FK_Reviews_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Reviews] CHECK CONSTRAINT [FK_Reviews_Users]
GO
ALTER TABLE [dbo].[StoreImages]  WITH CHECK ADD  CONSTRAINT [FK_StoreImages_Images] FOREIGN KEY([ImageId])
REFERENCES [dbo].[Images] ([Id])
GO
ALTER TABLE [dbo].[StoreImages] CHECK CONSTRAINT [FK_StoreImages_Images]
GO
ALTER TABLE [dbo].[StoreImages]  WITH CHECK ADD  CONSTRAINT [FK_StoreImages_Stores] FOREIGN KEY([StoreId])
REFERENCES [dbo].[Stores] ([Id])
GO
ALTER TABLE [dbo].[StoreImages] CHECK CONSTRAINT [FK_StoreImages_Stores]
GO
ALTER TABLE [dbo].[Stores]  WITH CHECK ADD  CONSTRAINT [FK_Stores_Categories] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Categories] ([Id])
GO
ALTER TABLE [dbo].[Stores] CHECK CONSTRAINT [FK_Stores_Categories]
GO
ALTER TABLE [dbo].[Stores]  WITH CHECK ADD  CONSTRAINT [FK_Stores_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Stores] CHECK CONSTRAINT [FK_Stores_Users]
GO
ALTER TABLE [dbo].[Tokens]  WITH CHECK ADD  CONSTRAINT [FK_Tokens_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Tokens] CHECK CONSTRAINT [FK_Tokens_Users]
GO
ALTER TABLE [dbo].[UserImages]  WITH CHECK ADD  CONSTRAINT [FK_UserImages_Images] FOREIGN KEY([ImageId])
REFERENCES [dbo].[Images] ([Id])
GO
ALTER TABLE [dbo].[UserImages] CHECK CONSTRAINT [FK_UserImages_Images]
GO
ALTER TABLE [dbo].[UserImages]  WITH CHECK ADD  CONSTRAINT [FK_UserImages_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UserImages] CHECK CONSTRAINT [FK_UserImages_Users]
GO
USE [master]
GO
ALTER DATABASE [iFoody2012] SET  READ_WRITE 
GO
