USE [master]
GO
/****** Object:  Database [iFoody]    Script Date: 12-Jan-18 9:36:40 AM ******/
CREATE DATABASE [iFoody]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'iFoody', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS02\MSSQL\DATA\iFoody.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'iFoody_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS02\MSSQL\DATA\iFoody_log.ldf' , SIZE = 768KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
GO
ALTER DATABASE [iFoody] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [iFoody].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [iFoody] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [iFoody] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [iFoody] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [iFoody] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [iFoody] SET ARITHABORT OFF 
GO
ALTER DATABASE [iFoody] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [iFoody] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [iFoody] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [iFoody] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [iFoody] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [iFoody] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [iFoody] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [iFoody] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [iFoody] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [iFoody] SET  DISABLE_BROKER 
GO
ALTER DATABASE [iFoody] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [iFoody] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [iFoody] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [iFoody] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [iFoody] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [iFoody] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [iFoody] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [iFoody] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [iFoody] SET  MULTI_USER 
GO
ALTER DATABASE [iFoody] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [iFoody] SET DB_CHAINING OFF 
GO
ALTER DATABASE [iFoody] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [iFoody] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [iFoody] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [iFoody] SET QUERY_STORE = OFF
GO
USE [iFoody]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [iFoody]
GO
/****** Object:  Table [dbo].[Categories]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[Comments]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[FavoriteLists]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[Images]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[ProductImages]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[Products]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[Reviews]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[StoreImages]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[Stores]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[Tokens]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[UserImages]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 12-Jan-18 9:36:41 AM ******/
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
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'65480383-c9ce-43e7-a4c4-00b926c57828', N'Fast food')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'7914f9dc-c679-4661-acca-074821678f02', N'Đồ nướng')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'a1cc3b6d-d720-46c6-b48f-0934a95d1b68', N'Bánh')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'ce432a2c-8d9b-4c16-98d6-0b8f44c29fc9', N'Cơm')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'166f264f-807c-4598-8d87-495a337d457c', N'Trà sữa')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'03485570-4e7c-4dd1-ac46-4fb36f86de6f', N'Quán ăn')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'0cc7aa64-2bac-4f04-a643-727f3ceae5d3', N'Pizza')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'91a78fb8-cd67-4057-a905-a5cd449a624e', N'Ăn vặt-vỉa hè')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'44bf4b35-5d4e-4703-bb6b-a83a97cd549a', N'Lẩu')
INSERT [dbo].[Categories] ([Id], [Name]) VALUES (N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'Cà phê')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'd2952a8f-a192-4708-ab02-22ef7ab35b65', N'52da82fd-f624-4260-8617-00759c715d08', N'6c613d63-5c70-4aec-b224-104ad02751b4', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'a96c3b46-8ffd-43be-9cf6-29811dff0da5', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'78050fc4-6a08-408f-aafb-1a0061f034d3')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'b05d2a9b-1783-4af2-b470-2ad9b9500027', N'b1c78bed-834a-4ffd-b74f-ef04e3ea51ae', NULL, N'3836de70-66ef-42f8-9266-196d77e9f9e2')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'dd36e890-6b41-4133-a704-4584ef07f84d', N'a610d993-0954-4f5f-a5b1-b61fd07dbd39', NULL, N'690a4d69-5536-4ca7-b0aa-062e94042710')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'ecafd41b-fb6e-4879-a8a4-4a8bb89666c7', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'78050fc4-6a08-408f-aafb-1a0061f034d3')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'838e5816-b080-48f2-ae73-63682e4ecf24', N'52da82fd-f624-4260-8617-00759c715d08', NULL, N'ec49f95a-4ad1-421e-8100-22d5038c827e')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'efe59d1f-576d-475e-b3d6-6991035bd0db', N'cc736f75-4b3f-457b-9110-2272455e282d', NULL, N'78050fc4-6a08-408f-aafb-1a0061f034d3')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'b8194d30-264d-47a7-99ae-73f555604e1a', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'78050fc4-6a08-408f-aafb-1a0061f034d3')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'41c13ac0-bb2e-4b52-9a9b-82736ae67c15', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'd8ef5614-ec4d-4aba-90d1-8138a5c85a3d')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'c4f316cd-9fb6-4836-9ca2-8799a9cdef3c', N'85bd14ee-bdcc-464b-b430-f403c59e8ad9', NULL, N'78050fc4-6a08-408f-aafb-1a0061f034d3')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'e19560ad-481b-403f-a10b-8936c329c85f', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'98152096-4a44-4c7f-93a1-074ce52c85a2')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'9b8eebfc-6183-445e-aee9-8959e89a140d', N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'5b6aadad-add0-484a-8632-4bbf16f77365')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'a7f4515a-2509-481e-af38-89d372ceaf7c', N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'f01b98b9-3b5c-47ab-9297-69b535f37373')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'ff502c73-9a9d-40be-935f-8fa7bfe6c8b3', N'76cf2742-a9aa-4af8-ab3d-95310a8a7c21', N'386218d9-b79d-44e0-8d4f-73630da8254e', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'f3b65f78-ea4a-4c05-a3a9-9485b2004b0b', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'0d46aa19-8d99-41d3-b46b-781be67f289b')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'f4251ceb-7450-4c4a-ad2b-96fc41150f7e', N'76cf2742-a9aa-4af8-ab3d-95310a8a7c21', NULL, N'd44cecf8-edb9-466b-9298-64e5f6eb4b73')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'049b3286-21af-4d48-bae7-999136efbc75', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'904ea7cf-6740-414b-8b77-08075b4b60ff')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'f7328da2-37bd-4816-8037-9df2f76750dd', N'19892089-46b2-4162-8c17-279f3cb7b02a', N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'4aa24653-0a82-4a7d-b60d-a18e096672fd', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'26c9a7ad-d8a8-4682-bd37-7d921bd4f8a5')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'7b546638-5835-4b4f-8976-b1534628d7a2', N'1669bbc7-1b6d-4f6b-bbc0-048e56465699', N'f6d69b54-0001-45e9-8c40-132f57e70a28', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'93b1185f-d419-4b05-9ad8-b7916b1c0b51', N'52da82fd-f624-4260-8617-00759c715d08', N'6c613d63-5c70-4aec-b224-104ad02751b4', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'6f95f655-44ad-4cdb-91c5-bd68e2be8719', N'1669bbc7-1b6d-4f6b-bbc0-048e56465699', NULL, N'e6c162f1-fcd3-413c-bf87-329105fcf62c')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'b3822d1a-7327-40c5-9b66-ca7b41d27374', N'b59f4110-239c-4005-b10c-2f410996ec5d', N'688c8198-3442-40af-b98c-4d02c37d091d', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'eca2943d-befa-4157-91ba-d27d70770e9c', N'59835b2c-bb91-4f70-9b52-d9794b188982', NULL, N'904ea7cf-6740-414b-8b77-08075b4b60ff')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'213a17f2-96a6-4e93-b29b-d6b69eb9d19c', N'a610d993-0954-4f5f-a5b1-b61fd07dbd39', NULL, N'1176fe38-6587-42fe-bfdb-720bf4e98d0c')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'5df0900a-ecc5-4e1b-b7b5-da1991868fbd', N'a0207895-29f3-4fcf-a80e-ec3337b7cdce', NULL, N'21a74063-d010-46a7-9f7e-164146d00180')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'ac98a6d8-b2da-4bfd-bd36-e182f7399385', N'52da82fd-f624-4260-8617-00759c715d08', N'6c613d63-5c70-4aec-b224-104ad02751b4', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'94197679-5f83-4c1b-843d-e3e88c3d1982', N'cc736f75-4b3f-457b-9110-2272455e282d', N'7f5a7217-2b62-4c03-b031-3111b8060fcd', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'38936455-81e1-4579-aed9-eab825dea619', N'2c89c409-28e1-4b81-acb7-9beb5a7349db', N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e', NULL)
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'211ccd0b-82ca-4fda-819d-eac615131d8b', N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'98152096-4a44-4c7f-93a1-074ce52c85a2')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'ae7945eb-273f-4a7a-be18-f0d516b7c539', N'29521f16-8458-4292-b440-8dbc5f34787c', NULL, N'3e665b3b-472c-4c86-a4be-625ebb9d7667')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'9f8192e7-72c5-46ed-b959-f26aabdc7432', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'd8ef5614-ec4d-4aba-90d1-8138a5c85a3d')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'f403075d-8b23-4928-b6a9-f5cc9e697bc1', N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', NULL, N'98152096-4a44-4c7f-93a1-074ce52c85a2')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'0656b9fa-e4dd-4503-8e01-f6a7d4a28eb2', N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'eb471c39-9742-4cd6-b274-5d6362c51a35')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'3f70d03f-2cda-481e-95ff-f97174f91caf', N'cc736f75-4b3f-457b-9110-2272455e282d', NULL, N'f01b98b9-3b5c-47ab-9297-69b535f37373')
INSERT [dbo].[FavoriteLists] ([Id], [UserId], [StoreId], [ProductId]) VALUES (N'52f85efa-4955-4622-893f-f9b9ba1ead36', N'29521f16-8458-4292-b440-8dbc5f34787c', N'1bfa683d-e532-4a97-bf38-65e0a3962966', NULL)
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'7b44ae56-f1d8-4c08-82f6-05dc95537048', N'example1', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'78d60ed6-367e-4e25-b583-08d2405660a2', N'avatar13', N'https://sg-dae.kxcdn.com/blog/wp-content/uploads/2015/02/one-couple-two-spiritual-paths.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95', N'example3', N'http://cdn2.koreanbapsang.com/wp-content/uploads/2015/05/DSC_0769-e1430744789873.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'4b46d043-9644-40e1-93ac-2ef5261088ce', N'example6', N'http://toidi.net/wp-content/uploads/2015/09/quan-lau-ha-noi-ngon.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'3d31cc2c-d35b-454c-bab6-3640240a8ded', N'example2', N'https://media.cooky.vn/images/blog-2016/fan-cuong-tra-sua-cung-chua-chac-biet-het-7-su-that-thu-vi-nay-1.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'28b6ebce-7b8f-472f-9bca-425bbdcedf25', N'Test9', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'f5e62f89-553b-4ac9-988c-4282743b2598', N'avatar12', N'https://cdn.pixabay.com/photo/2015/08/31/19/24/couple-915991_960_720.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'afd2b192-cb67-49a2-90fa-471fa51f4d5c', N'avatar7', N'http://anh.24h.com.vn/upload/4-2014/images/2014-10-24/1414133054-meo-grumpy-1.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'5c4f3b9a-1b2a-4cbd-b851-5b1b834b2215', N'avatar6', N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAEsItXCnFSGuRY0iv51LMvUSRSZvHSe7_v2NChT56L7WmpPnzdA')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7', N'example5', N'http://a9.vietbao.vn/images/vn999/193/2016/11/20161104-nhung-nguoi-kh-244-ng-n-234-n-an-lau-6.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'42b80bb8-2260-4720-a1ef-6d49f1b26df2', N'avatar1', N'http://nguoiduongthoi.com/wp-content/uploads/avatar-dep-chat-2.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'1f4c2921-6ac2-4730-860b-6e1e69723ac9', N'Effoc', N'http://www.effoc.vn/uploads/images/shop/22-0-baucat.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'6f065ea1-9a86-49d1-9427-6ff917871fdd', N'avatar5', N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbWpAQYh-eFhOUuBOenco4vbclGBKNeHCiHvUeo_xtwjAtXXCU')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'5c9945a6-7d2e-4d44-9a1b-73c68cb99de6', N'avatar8', N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDzl5mG702AAz5whIZ-FqXz-FDIGwIFNrP77lDX2WWiU0Knru')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'69091d97-b973-4086-ae3b-74f660fa8307', N'avatar3', N'https://media.lamsao.com//Data//hungvv/26022016/cach_tinh_tuoi_cua_cho_3.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'b0d875db-7e31-4aa1-bd23-783e8ef8d25a', N'avatar14', N'https://i.pinimg.com/736x/fd/63/f9/fd63f9f0b416430cc6d587b51052bd6f--love-photos-couple-couples-love.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'dd12e932-5964-4113-b6af-78b94f1619c5', N'Test10', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'665db2d3-2a6a-4bca-a7ca-8a9a6d621175', N'Test8', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'dd77b272-e035-4a35-9f3a-9a9b1307bebc', N'The coffe house', N'https://vietnamcoffee.asia/uploads/ca-phe/2016_01/thuong-hieu-ca-phe-the-coffee-house.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'5821e479-033d-4f3f-a74e-9ced40a76001', N'example4', N'https://monngon123.com/wp-content/uploads/2017/07/huong-dan-cach-lam-kimbab-chien.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'f83a7f6b-5195-4c5c-8528-9f64d2749cf2', N'Test3', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'ec9cc3ad-2997-4a85-836c-acd61821922d', N'Test7', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'2fc25ff9-16c5-4be7-a67a-ae815e3d8e56', N'Test9', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'2186a509-9b1e-48d1-99cf-affe3ce4f03b', N'avatar9', N'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/baby_skin_care_slideshow/istock_photo_of_sleeping_newborn.jpg?resize=400px:*&output-quality=50')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'41cbaab3-263f-4b28-8e2b-b6bd2b939e51', N'Test1', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'a7cd2f53-f641-4374-a686-b9900e29384d', N'Đà Lạt Phố', N'http://cafemocmien.vnnavi.com.vn/gallery/3002/516691741_cafe-moc-mien-25-jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'd1ffcb66-bdf6-420d-8c14-c25e5b937c2e', N'avatar2', N'https://www.thukieng.com/wp-content/uploads/2016/02/gia-mua-ban-cho-corg-thuan-chung-ha-noi-tphcm.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'344aee25-8c96-412b-b124-c96fa551bf79', N'avatar11', N'https://cdn.pixabay.com/photo/2016/11/08/10/07/couple-love-1807857_960_720.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'f0c56bed-4513-4a8e-a41d-cec295d4bff5', N'Urban station', N'http://www.urbanstation.com.vn/ckeditor/ckfinder/upload/images/store/us02.jpg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'f1347121-01f1-4a75-9ed0-d11a3041df96', N'Test11', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'6a80b774-d467-4036-a714-e45b1cd42608', N'avatar10', N'https://static.pexels.com/photos/136411/pexels-photo-136411.jpeg')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'0bbd0fd0-c99b-4ad4-8c0a-eb174bf871f4', N'Test2', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'd2877e9b-8568-4eee-a094-f77d3fb73c01', N'Test3', N'https://tea-2.lozi.vn/v1/images/resized/tra-sui-bot-la-cay-hat-no-vi-dau-tra-xanh-kiwi-hat-no-vi-kiwi-1481136647-2197488-1491215954?w=480&type=s')
INSERT [dbo].[Images] ([Id], [Name], [Path]) VALUES (N'59e15351-75ba-4745-b1ea-ff39f2cbc1d3', N'avatar4', N'http://perfectcompanion.com.vn/getattachment/Sach-Huong-Dan/cham-soc-meo/MEO-YEU-%C4%90UOI-NHAT-LUC-SI-TINH/buon-(1).jpg.aspx')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'add83267-1901-4ee8-b774-084718bd9353', N'78050fc4-6a08-408f-aafb-1a0061f034d3', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'1e7266a2-89fc-4f89-adf3-13f3311538a7', N'3836de70-66ef-42f8-9266-196d77e9f9e2', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'762a35a7-5eee-473d-90d3-15384e2c7466', N'21a74063-d010-46a7-9f7e-164146d00180', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'285685c0-fefd-408a-83d0-1eb3de59c001', N'32ce8706-e2d2-4805-b4e8-df63d7a29954', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'0abf5145-14f4-444e-a0b7-21d130896913', N'a036344e-7106-4055-8a8b-d75fd5492f42', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'97d60910-278a-41e7-b008-249073bdc43c', N'0d46aa19-8d99-41d3-b46b-781be67f289b', N'5821e479-033d-4f3f-a74e-9ced40a76001')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'fe1fd20a-4e8a-4ad0-8d23-24cdd009d81d', N'dda03f83-c8d6-4efd-9c02-973322bc523a', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'b19d4e7c-3a95-4d8f-b9e8-269e0a46e71c', N'1ca371db-e6d8-4c93-a28a-9338cd4340f8', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'050212cb-9998-4db0-822b-2980c08dd0b9', N'5b6aadad-add0-484a-8632-4bbf16f77365', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'05fe14c1-fab6-45d1-b1a3-2f8f59875d55', N'f01b98b9-3b5c-47ab-9297-69b535f37373', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'348dbe93-d39f-487c-9566-30df77237d41', N'1649c269-c1df-4dea-bb91-c26a2ee48436', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'9eb0d947-2d79-494b-a3f2-373e5fbddacf', N'f6d8fe0c-6630-407b-bf26-cb076da7a541', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'659b7d5a-04aa-4bcb-bf18-3b0f813c08e6', N'5bb7050c-85bc-4095-839a-f1743dc65712', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'6c6b5ed5-4f66-45e8-91e9-3b104ec4b21c', N'637bcefe-2c3d-4eb7-9d39-dbfe300d9442', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'b34ba93e-4fc3-4b3d-ada0-3b6e6ba27995', N'b9de11c6-25f2-4cd2-b683-a0f4269a7da2', N'5821e479-033d-4f3f-a74e-9ced40a76001')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'1ce15ccd-5482-458e-b5f1-3f6d62d2560a', N'c14b08f8-7032-4dae-a583-ceb6b3daf4a7', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'7a1c9532-6343-4d23-8ddf-3fb3fd684377', N'3c744119-1e8d-416e-b5ac-ccb6730d5039', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'80f7863b-2c50-4603-96ff-412ccb251cf0', N'3c6a25dc-1893-4f24-9381-78e98ff644e8', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'dddd9913-f9b8-4bd4-9bfb-42469c739501', N'd44cecf8-edb9-466b-9298-64e5f6eb4b73', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'2750851d-9d1d-4fa9-baac-4afc10adb5f9', N'ea6da64e-3afb-45cc-90fc-a193f6bb056d', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'369b4834-bdc6-4970-bafb-525fa87a64c5', N'3e665b3b-472c-4c86-a4be-625ebb9d7667', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'477a0715-5a69-4cb5-86ba-58bac01742d2', N'1176fe38-6587-42fe-bfdb-720bf4e98d0c', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'3424417e-ce32-4c3d-b812-59953de6d9af', N'1a13c766-f243-448b-8489-cffd188ac25b', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'15eb0f3c-bdad-4557-9bfc-5c4981017e31', N'e6c162f1-fcd3-413c-bf87-329105fcf62c', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'e26b3661-45ff-407e-a109-5e8a8d0db099', N'ef7be5b0-6348-4337-89ad-85a3e359fbb0', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'dcefa653-6add-4d44-bbb3-6c92e51b0319', N'4830b113-9c00-433d-948c-d0dc631e9303', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'3beafcb1-1b8a-4f74-8202-701242db665c', N'd8ef5614-ec4d-4aba-90d1-8138a5c85a3d', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'5208beda-7251-46ca-8ae0-70b0d811afaa', N'17c6ebf9-d862-4753-bb6c-86410c5c2505', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'8fca6ebe-316b-4df0-9c1f-768b661bb211', N'793fdde7-f8d6-4714-b4a9-cb0677f9b4b0', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'0acc0f9d-bc95-44aa-b45c-831ed30e791b', N'c9c57d34-a310-4279-935b-768856520936', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'20d38e48-16d7-427e-9a2c-877b1a471119', N'9870bc11-27a7-4b9b-ba0f-cb3950f83386', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'93ab00d0-3da6-4365-b4fa-8a82d406bc3a', N'b024ffb6-6da7-4e36-a7f3-c0524eec887b', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'2d7f3f25-e10c-4394-956b-8ec09ceb86f4', N'8b2ecf33-d075-4e1f-88bf-a5f77b17dc0e', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'70e5eb90-44a5-48ba-9cc6-a05bd7888400', N'72d576cb-d130-41a0-b294-b8c5ea171f05', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'dbaeb537-20e0-471e-95aa-a9736be87629', N'15c2319c-f7f8-4a14-93cd-8e081084dfad', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'9a38fe33-0474-46ee-aaf6-ae15a75bc484', N'f0701063-ef8d-410e-bd4d-8cb85280ce38', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'848e7166-36e4-4a75-ad17-b2f2c6066eae', N'00c48e73-be2a-4fef-86b8-d2f9dbb1cac4', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'3ea56b44-8a9b-4050-852d-b3868e96a6ba', N'690a4d69-5536-4ca7-b0aa-062e94042710', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'c31d73c2-c592-412d-8f34-b69e003451f4', N'55d72505-2b7e-4bf4-afe8-a587a50720e2', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'18ba6aa5-a9ec-4cda-923a-b6f1bfa2cb8e', N'14e4bf64-aba2-43da-ad7e-d59d666cd241', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'6523d52a-4ef8-4098-9f20-c065344ef4e7', N'eb471c39-9742-4cd6-b274-5d6362c51a35', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'299c5245-3863-41b6-af6b-c091b3a57441', N'5cce3c92-8059-4ab6-9b3a-adbd6d4f6218', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'bc0bd0ef-005c-47fc-9769-c5cd69146dac', N'aa157f00-9971-4785-a6e0-9d0e36d9c8df', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'e39ac32b-4cea-403c-8767-d2fe31a2fe89', N'98152096-4a44-4c7f-93a1-074ce52c85a2', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'1712c714-dab7-4668-8a1b-d4bf6177e451', N'ec49f95a-4ad1-421e-8100-22d5038c827e', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'8ab26017-9c85-4b79-9688-d7539737bd75', N'dc02d661-ae30-4fc8-88e7-cfce3a83dadb', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'a2c4da7a-9812-4875-97c7-d96a0fc47a6a', N'badd2f46-f47a-409e-b4a0-a12510a79cd8', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'19dd2355-601d-407f-bc0a-dd93e0dfe3d9', N'8c2cd8f0-ee79-4e1a-a75b-de1778eaff9b', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'2f42169e-172a-4af4-a826-ddab324324bb', N'b980a3b5-52b3-4ac8-bdc7-907f082efc53', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'bfa87a71-f1f4-4a42-9268-e4a4b8425be0', N'10045f95-82d8-4980-932d-9e6de5f053e7', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'5d7b8244-b4ef-45cd-8404-e87b93210b5a', N'26c9a7ad-d8a8-4682-bd37-7d921bd4f8a5', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'44445b25-0fd7-45a8-96a8-e89a35284d8e', N'b0ea83e7-658d-4c51-b159-e80055d2d45a', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'd6a088b1-96b2-479a-8d26-e9adad031cb0', N'5a3e716d-691f-4d67-893a-fe13fa0eef73', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'945e6d46-f131-4706-a713-ea40796c6a45', N'ac8dd64f-3856-4fd7-8549-881c66c2b8ab', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'246a76e5-53cc-46fb-a188-ec53bbbb4b96', N'e951fdf9-e3cd-44f8-82e1-9355ceecf0ee', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'df0b064b-29e0-4ab5-88ff-ed235c9e3653', N'4fe23236-6626-4a56-96f1-394be861b1e0', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'0a85695f-e8af-4f4d-90bf-ee6440da6ea1', N'd9e01797-2420-4094-9b8d-df0343ba98a6', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'155d2bb1-67ae-4f20-9609-f2732e0955aa', N'904ea7cf-6740-414b-8b77-08075b4b60ff', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[ProductImages] ([Id], [ProductId], [ImageId]) VALUES (N'95107a76-09e2-4604-a41f-f32480e000cf', N'1a55090d-5053-4317-af03-86736c293a9d', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'690a4d69-5536-4ca7-b0aa-062e94042710', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'98152096-4a44-4c7f-93a1-074ce52c85a2', N'Cafe sữa đá', CAST(28000 AS Decimal(8, 0)), N'Cafe rang xay nguyên chất cho ngày dài sản khoái', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'904ea7cf-6740-414b-8b77-08075b4b60ff', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'21a74063-d010-46a7-9f7e-164146d00180', N'Xô Trà Sữa Ðào', CAST(30000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'3836de70-66ef-42f8-9266-196d77e9f9e2', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'78050fc4-6a08-408f-aafb-1a0061f034d3', N'Bún nem cuốn', CAST(30000 AS Decimal(8, 0)), NULL, N'91a78fb8-cd67-4057-a905-a5cd449a624e', N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'ec49f95a-4ad1-421e-8100-22d5038c827e', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'e6c162f1-fcd3-413c-bf87-329105fcf62c', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'4fe23236-6626-4a56-96f1-394be861b1e0', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'5b6aadad-add0-484a-8632-4bbf16f77365', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'eb471c39-9742-4cd6-b274-5d6362c51a35', N'Cafe đen đá', CAST(25000 AS Decimal(8, 0)), N'Cafe rang xay nguyên chất cho ngày dài sản khoái', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'3e665b3b-472c-4c86-a4be-625ebb9d7667', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'd44cecf8-edb9-466b-9298-64e5f6eb4b73', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'f01b98b9-3b5c-47ab-9297-69b535f37373', N'Bánh mì hambuger', CAST(38000 AS Decimal(8, 0)), N'Bánh mì hiện đại cho giới văn phòng', N'91a78fb8-cd67-4057-a905-a5cd449a624e', N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'1176fe38-6587-42fe-bfdb-720bf4e98d0c', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'c9c57d34-a310-4279-935b-768856520936', N'Gà rán chiên gia vị
', CAST(59000 AS Decimal(8, 0)), N'Gà thả vườn chiên cay xả ớt cực ngon', N'65480383-c9ce-43e7-a4c4-00b926c57828', N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'0d46aa19-8d99-41d3-b46b-781be67f289b', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'3c6a25dc-1893-4f24-9381-78e98ff644e8', N'Xô Trà Sữa Olong', CAST(30000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'26c9a7ad-d8a8-4682-bd37-7d921bd4f8a5', N'Bún đậu', CAST(25000 AS Decimal(8, 0)), N'Bún đậu mắm tôm ngon nhất quả đất', N'03485570-4e7c-4dd1-ac46-4fb36f86de6f', N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'd8ef5614-ec4d-4aba-90d1-8138a5c85a3d', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'ef7be5b0-6348-4337-89ad-85a3e359fbb0', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'17c6ebf9-d862-4753-bb6c-86410c5c2505', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'1a55090d-5053-4317-af03-86736c293a9d', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'ac8dd64f-3856-4fd7-8549-881c66c2b8ab', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'f0701063-ef8d-410e-bd4d-8cb85280ce38', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'15c2319c-f7f8-4a14-93cd-8e081084dfad', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'b980a3b5-52b3-4ac8-bdc7-907f082efc53', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'1ca371db-e6d8-4c93-a28a-9338cd4340f8', N'Gà chiên cay ngọt', CAST(53000 AS Decimal(8, 0)), N'Gà thả vườn chiên cay xả ớt cực ngon', N'65480383-c9ce-43e7-a4c4-00b926c57828', N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'e951fdf9-e3cd-44f8-82e1-9355ceecf0ee', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'dda03f83-c8d6-4efd-9c02-973322bc523a', N'Cafe Gia Lai sữa đá', CAST(28000 AS Decimal(8, 0)), N'Cafe rang xay nguyên chất cho ngày dài sản khoái', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'aa157f00-9971-4785-a6e0-9d0e36d9c8df', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'10045f95-82d8-4980-932d-9e6de5f053e7', N'Macchiato Black Tea', CAST(40000 AS Decimal(8, 0)), N'Ngon bổ rẻ hợp với giới trẻ văn phòng', N'166f264f-807c-4598-8d87-495a337d457c', N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'b9de11c6-25f2-4cd2-b683-a0f4269a7da2', N'Bún đậu thập cẩm', CAST(55000 AS Decimal(8, 0)), N'Bún đậu thập cẩm đủ loại theo phong cách Hà Nội xưa', N'03485570-4e7c-4dd1-ac46-4fb36f86de6f', N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'badd2f46-f47a-409e-b4a0-a12510a79cd8', N'Xô Bia Đào', CAST(30000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'ea6da64e-3afb-45cc-90fc-a193f6bb056d', N'Gà CN3', CAST(53000 AS Decimal(8, 0)), N'Gà thả vườn chiên cay xả ớt cực ngon', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'55d72505-2b7e-4bf4-afe8-a587a50720e2', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'8b2ecf33-d075-4e1f-88bf-a5f77b17dc0e', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'5cce3c92-8059-4ab6-9b3a-adbd6d4f6218', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'72d576cb-d130-41a0-b294-b8c5ea171f05', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'b024ffb6-6da7-4e36-a7f3-c0524eec887b', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'1649c269-c1df-4dea-bb91-c26a2ee48436', N'Gà chiên chua cay', CAST(53000 AS Decimal(8, 0)), N'Gà thả vườn chiên cay xả ớt cực ngon', N'65480383-c9ce-43e7-a4c4-00b926c57828', N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'793fdde7-f8d6-4714-b4a9-cb0677f9b4b0', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'f6d8fe0c-6630-407b-bf26-cb076da7a541', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'9870bc11-27a7-4b9b-ba0f-cb3950f83386', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'3c744119-1e8d-416e-b5ac-ccb6730d5039', N'Xô Tuyết Ðá Xay', CAST(35000 AS Decimal(8, 0)), N'Xô đầy tuyết với đá xay cực ngon', N'166f264f-807c-4598-8d87-495a337d457c', N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'c14b08f8-7032-4dae-a583-ceb6b3daf4a7', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'dc02d661-ae30-4fc8-88e7-cfce3a83dadb', N'Xô Đá Tắc Sả', CAST(38000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'1a13c766-f243-448b-8489-cffd188ac25b', N'Gà CN1', CAST(53000 AS Decimal(8, 0)), N'Gà thả vườn chiên cay xả ớt cực ngon', N'03485570-4e7c-4dd1-ac46-4fb36f86de6f', N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'4830b113-9c00-433d-948c-d0dc631e9303', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'00c48e73-be2a-4fef-86b8-d2f9dbb1cac4', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'14e4bf64-aba2-43da-ad7e-d59d666cd241', N'Trà Đen Kem Sữa', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'166f264f-807c-4598-8d87-495a337d457c', N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'a036344e-7106-4055-8a8b-d75fd5492f42', N'Trà Earl Grey Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'637bcefe-2c3d-4eb7-9d39-dbfe300d9442', N'Xô Sữa Phê', CAST(28000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'8c2cd8f0-ee79-4e1a-a75b-de1778eaff9b', N'Gà CN2', CAST(53000 AS Decimal(8, 0)), N'Gà thả vườn chiên cay xả ớt cực ngon', N'65480383-c9ce-43e7-a4c4-00b926c57828', N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'd9e01797-2420-4094-9b8d-df0343ba98a6', N'Cafe Gia Lai đen đá', CAST(23000 AS Decimal(8, 0)), N'Cafe rang xay nguyên chất cho ngày dài sản khoái', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'32ce8706-e2d2-4805-b4e8-df63d7a29954', N'Bún đậu cuốn', CAST(45000 AS Decimal(8, 0)), N'Bún đậu cuốn theo phong cách Hà Nội xưa', N'03485570-4e7c-4dd1-ac46-4fb36f86de6f', N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'b0ea83e7-658d-4c51-b159-e80055d2d45a', N'Trà Oolong Kem Sữa', CAST(47000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'5bb7050c-85bc-4095-839a-f1743dc65712', N'Trà Xanh Gongcha', CAST(43000 AS Decimal(8, 0)), N'Trà sữa gạo ngon,trân châu trắng cực ngon cực giòn. Uống bn lần vẫn thích', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Products] ([Id], [Name], [Price], [Description], [CategoryId], [StoreId]) VALUES (N'5a3e716d-691f-4d67-893a-fe13fa0eef73', N'Bánh mì kẹp', CAST(28000 AS Decimal(8, 0)), N'Bánh mì ngon rẻ một phút 30 giây', N'91a78fb8-cd67-4057-a905-a5cd449a624e', N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'ee429f22-b977-454d-8c9b-00a4ec4c5c00', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'32ce8706-e2d2-4805-b4e8-df63d7a29954', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd7324ba8-9c3c-442b-8d5c-00daae2d0fd2', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'9ca9da3c-10d3-49fc-b906-0128bed507e0', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'5a3e716d-691f-4d67-893a-fe13fa0eef73', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'b2b628c5-ddf4-43c0-911f-02263276f123', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'3e8de0db-7722-4159-8e4c-03c9bc4f96cb', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'ee65a2f0-4be7-409d-9c7d-03d17bd66d4d', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'72d576cb-d130-41a0-b294-b8c5ea171f05', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'6b1f4aad-39f3-44d1-9b14-04a690d28c02', N'Ngon lành cành đào!!!', 5, CAST(N'2017-12-05T11:47:07.470' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'b6d943e9-9673-4124-9a01-09521783c373', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'dda03f83-c8d6-4efd-9c02-973322bc523a', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd9ad8ef6-c1e6-407c-a32a-0a1bd1ce0b7e', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'b4a8f8a8-95f5-488c-bcf8-0c18e24e7b6d', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8964367b-387b-45b7-841c-0df795279611', N'1 sao nè', 0, CAST(N'2017-12-05T12:01:47.753' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd16d7cfe-9127-491e-ad57-0e02f32a8a22', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'89746c99-78e4-4c67-b452-10a7e186a6ed', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c504e813-500b-43db-a194-1108376aad7f', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'fba84cd4-335c-404d-adaf-13fdb72cd7dd', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'23dbbd42-28e3-4aed-bd56-14b487b43f71', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'1a13c766-f243-448b-8489-cffd188ac25b', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a889601f-ed0d-4be1-b39b-15b0fcc6547c', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'1649c269-c1df-4dea-bb91-c26a2ee48436', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'14b17762-2c58-4de2-98b3-1831b02f12cd', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'b6edcf84-daeb-4d89-933e-1a5a8326ec4e', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'12dffe88-f117-472e-a654-1b81ada57999', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'3c744119-1e8d-416e-b5ac-ccb6730d5039', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd1585dde-03b4-464e-bb67-1fc2d113ff13', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'14e4bf64-aba2-43da-ad7e-d59d666cd241', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'91935e18-2cb9-4144-b940-209b3f26345f', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'15c2319c-f7f8-4a14-93cd-8e081084dfad', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a80ab0d3-724a-4eae-99d4-275927a1ec3b', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7100dfdd-f95c-4783-a27d-2778f177edfa', N'Ngon quá', 4, CAST(N'2017-12-23T16:28:16.740' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'0d46aa19-8d99-41d3-b46b-781be67f289b', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a1e97b3f-e378-4085-9a47-281415609944', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'd8ef5614-ec4d-4aba-90d1-8138a5c85a3d', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'9efd912b-aeaa-479a-860b-29eb77912b24', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'17c6ebf9-d862-4753-bb6c-86410c5c2505', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'31961f23-e418-4cac-989d-2b11e89e459e', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'483850f7-5389-4742-b6e6-3097d08b3070', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7d2830c5-ae27-4ead-9d05-30a8f6862ad9', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'e951fdf9-e3cd-44f8-82e1-9355ceecf0ee', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'3d80473b-26e3-425c-a2d7-32a5bace8af8', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'1e5907e8-554e-46c5-8329-3462ffc2a820', N'2 sao thôi ngen. Dở ẹt!', 2, CAST(N'2017-12-05T11:24:07.943' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'17b98c7c-926d-4bc3-b70e-373efb88a555', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'ae064be1-4301-4f04-acc0-393ff94509ab', N'Thích hợp cho tuổi teen.', 0, CAST(N'2017-12-05T11:49:31.827' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'f8ffa111-317f-4971-9e04-3c03ca5b1525', N'Nói chung là ngon.', 0, CAST(N'2017-12-05T11:49:31.827' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'b451b51d-a739-4b8b-9ae2-3e4a9d24a3c2', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'9870bc11-27a7-4b9b-ba0f-cb3950f83386', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'b2ef6be2-6d56-456a-8570-3e7f7e8cdd6f', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'5bb7050c-85bc-4095-839a-f1743dc65712', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'e5b229e2-2930-41f4-8e36-416fbba85296', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'690a4d69-5536-4ca7-b0aa-062e94042710', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'f6640778-b02e-4c1c-8d73-425f1d0428ed', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'c9c57d34-a310-4279-935b-768856520936', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd91e2eab-0b16-4c0c-88da-471c7341215a', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'dc02d661-ae30-4fc8-88e7-cfce3a83dadb', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'00c401c5-d358-4d96-a0c8-4792ae8521e6', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'34fe5ed5-05f1-465b-b7a5-48eab533b7f6', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c816523d-22a2-4dc7-a4b3-499a12a6bed7', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'c14b08f8-7032-4dae-a583-ceb6b3daf4a7', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'6cc3d9b9-9c95-40df-bc11-49bcd8559e7b', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'9bf7c12e-d338-45c2-9f2f-4a007ba08d56', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'637bcefe-2c3d-4eb7-9d39-dbfe300d9442', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'27a036d3-743a-4fcc-8110-4c541260aea9', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'15f74963-19e0-4fa8-b89d-4cc0cb287b33', N'e thích ngọt. 5 sao', 5, CAST(N'2017-12-05T12:03:46.477' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'513ab7b6-8d12-4b5e-9481-4e13bef4c73a', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'25128337-4770-4e5b-ba0c-4edc3a75094b', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'381af983-02d9-4db4-9024-5066cb411a7d', N'Dở kinh khủng', 0, CAST(N'2017-12-05T12:00:45.183' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'bb162d37-6360-4ca9-99b7-53abe023bea3', N'Trà ji mà ngon dã man con ngan!!!', 5, CAST(N'2017-12-05T00:00:00.000' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd2afa89e-f77e-4662-ac2a-53be847beabd', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'55d72505-2b7e-4bf4-afe8-a587a50720e2', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'796a0b72-af4b-47e4-8af9-55d5c1b4de7e', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'8c2cd8f0-ee79-4e1a-a75b-de1778eaff9b', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8989ca52-081c-4a64-818d-596294d9a3db', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'9cb09811-cf30-4e84-b5aa-5aeb8f87071e', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c5e2fa23-6ffe-4bdc-9bee-5c0c107d14a1', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'ac8dd64f-3856-4fd7-8549-881c66c2b8ab', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7418410a-8526-4f3c-822f-5c2049d01a00', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'a036344e-7106-4055-8a8b-d75fd5492f42', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'fd16d37e-51e8-46df-8dc2-5d73875c785c', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a8254464-2c30-4879-a25a-5e41a238f5de', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8a615246-8569-4e40-b4db-60e18fd745ee', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'ef7be5b0-6348-4337-89ad-85a3e359fbb0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'31743ab3-3e5f-4d07-bc7f-61cf55b825f2', N'Ngọt quá ko chịu được', 4, CAST(N'2017-12-05T11:52:47.473' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'e7625739-b995-40ce-bf95-62fdda887672', N'1 sao. Quá ngọt', 1, CAST(N'2017-12-05T12:03:46.477' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8add4afb-c7e5-499e-9867-63561d7c0a91', N'thay ma gom', 1, CAST(N'2017-12-05T00:00:00.000' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'1cee8477-77f1-416b-97d0-63cb8886d071', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'b9de11c6-25f2-4cd2-b683-a0f4269a7da2', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7af07238-9cb9-4d97-9906-6449939a9f75', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'929c3458-3215-4ed2-8ef2-65a4eec23a8a', N'ngon ne. 5 sao ', 0, CAST(N'2017-12-05T11:39:37.607' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'59379c6e-2a72-46d8-930f-6cf38f152dca', N'Tào lao mía lao', 3, CAST(N'2017-12-05T11:24:46.060' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'97814030-04c3-41c1-a1a3-6e1885e74030', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'0d46aa19-8d99-41d3-b46b-781be67f289b', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'147c0440-2a6d-4045-9980-6f11da49a139', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8b33768c-b314-45d0-b93e-6f9b49fa1d93', N'Ngon đấy', 0, CAST(N'2017-12-05T11:51:24.043' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'4836e792-cc53-4151-a462-6fcbcc250d92', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'10045f95-82d8-4980-932d-9e6de5f053e7', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'50f910c1-13b6-44ed-9d67-736247a64407', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'b7b4243f-2df8-49ba-8742-737715598b5b', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'1640c5ad-c143-4b2b-b2f6-73cf74d3712a', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'3c6a25dc-1893-4f24-9381-78e98ff644e8', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'012c0f02-758c-4911-a0b3-74560bdb11cb', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'51ced643-eb4a-4fcd-b2c0-75f9d6048d30', N'Tào lao mía lao 2', 3, CAST(N'2017-12-05T11:24:46.060' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c5205ed2-a90b-48db-a507-784a2102a2c5', N'
món nào cũng ngon thich nhất cơm trộn và gà chua cay 
', 4.4, CAST(N'2017-10-10T09:30:00.000' AS DateTime), N'1669bbc7-1b6d-4f6b-bbc0-048e56465699', NULL, N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'796658a4-ce7c-43a3-a184-7895ba10bc96', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'badd2f46-f47a-409e-b4a0-a12510a79cd8', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'075d0e5c-ea31-405f-81fc-7d3698ae5509', N'Ngon Quá', 4, CAST(N'2017-12-23T17:13:35.090' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'98152096-4a44-4c7f-93a1-074ce52c85a2', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd93dd9c6-8cb2-4cdc-8c16-7dd29bc6d265', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'690a4d69-5536-4ca7-b0aa-062e94042710', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'852ddae7-8aae-493e-aeef-7e6364598eea', N'
Quán nằm gần chợ Bến Thành mà do đường Lê Lợi đang có công trình nên quán bị lô cốt che phải chạy vòng xuống dưới rồi chạy lên lề đường một đoạn toàn ổ gà mới tới đc :)))\nCó nhân viên đứng đợi ngay cử...
', 4.4, CAST(N'2017-10-10T09:30:00.000' AS DateTime), N'1669bbc7-1b6d-4f6b-bbc0-048e56465699', NULL, N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'6b0b5d8e-3b45-44bc-8d0a-80d44035cc53', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'd9e01797-2420-4094-9b8d-df0343ba98a6', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'6345d284-d620-4987-bf0e-8182445112ab', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'b980a3b5-52b3-4ac8-bdc7-907f082efc53', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'9e162e83-2870-40ec-ad64-83cc9c209b40', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'b024ffb6-6da7-4e36-a7f3-c0524eec887b', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'2feb2bcf-08a3-4468-9bfe-8661f0e88ba1', N'
Quán giờ bị mấy công trình che lại rùi nên bị khuất. Mình đi buổi tối thấy cũng vắng vẻ.\nKhông gian trong quán ngồi thoải mái\nQuán này nổi tiếng các món tráng miệng, nhưng có các món mặn nữa.', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'47be6701-baf1-445d-a40c-89771d397034', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'f6d8fe0c-6630-407b-bf26-cb076da7a541', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'26a3e604-fb24-47fa-b295-8c4962e6f6aa', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'aad6b643-7e3f-497d-a7f3-946dc83db849', N'ngon quá nè', 5, CAST(N'2017-12-23T16:28:16.740' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'0d46aa19-8d99-41d3-b46b-781be67f289b', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a895af7c-6c63-4ee2-830c-96150c9144fe', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'793fdde7-f8d6-4714-b4a9-cb0677f9b4b0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'776d0427-eaed-4b6b-9c9a-9737fa1f6ca4', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'ef98def1-5780-4a69-9d1f-9951820d402b', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'00c48e73-be2a-4fef-86b8-d2f9dbb1cac4', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'9398a311-81d0-451e-96f1-a0e4ee3f454e', N'1 sao cho món này', 1, CAST(N'2017-12-05T12:03:46.477' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7b5b6e23-6178-41f9-9cbb-a18a0c00d07b', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'e3924c26-9afd-4d17-805d-a316d0b5df2b', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'97bee438-8925-47e1-92ce-a500de9cd075', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a8ca92ee-a067-414d-a7de-a553d06726b3', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'1a55090d-5053-4317-af03-86736c293a9d', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'2f5c5d60-4ded-48e8-a86a-a6a72dc39bb2', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'1bfa683d-e532-4a97-bf38-65e0a3962966')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'f5661eea-3a14-4e7d-8f64-a6dc66472f39', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c86f86f7-a8e1-4375-8c39-a6e4d3fb1079', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'2231b5a8-fb9b-4a9e-be30-a7a63b65a469', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'688c8198-3442-40af-b98c-4d02c37d091d')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a608ff8f-1792-48d0-ba02-a838387aa91b', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'aa157f00-9971-4785-a6e0-9d0e36d9c8df', NULL)
GO
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'fce732bd-5030-44ca-94c4-aa53b2226ba5', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'2432a816-8292-4ed1-b9d0-aac846c72b30', N'Ngon bổ rẻ cho 5 sao!!!', 0, CAST(N'2017-12-05T00:00:00.000' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'e16a5a3a-de9f-4f73-b5d8-b0b95358bd9a', N'4 sao nè', 4, CAST(N'2017-12-21T16:18:52.787' AS DateTime), N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', N'c9c57d34-a310-4279-935b-768856520936', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'cfdd9373-ef2b-45d8-859a-b303fdd4395d', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'a25262d9-609b-4033-a71c-b500062926e7', N'thay ma ghe', 2, CAST(N'2017-12-05T00:00:00.000' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c6831607-9f5c-440f-aabf-b52e86ac8b94', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'5cc392f0-840f-49e5-aa12-ba509ba701a5', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'4830b113-9c00-433d-948c-d0dc631e9303', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c7b9397d-dea9-49cc-80dc-bb60b3ed9ad5', N'Trà này ngon nè. Giá hơi cao xíu. Cho 4 sao', 4, CAST(N'2017-12-05T00:00:00.000' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8d71d4af-2333-4eaf-a8d3-bf5eef04c5dd', N'3 sao nhen.', 3, CAST(N'2017-12-05T11:33:19.447' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'e2556bd9-e4a8-4575-a9d9-c2fefc3417fe', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'782f75f8-4973-475c-acc4-c2ff6eaeb1a6', N'3 sao', 1, CAST(N'2017-12-05T11:58:03.920' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'edad652d-7708-4e31-9820-c417e1842084', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'1ca371db-e6d8-4c93-a28a-9338cd4340f8', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'451aa4fe-aa9e-4f6c-ac35-c4a7f8dad152', N'ngon quá má ơi', 5, CAST(N'2017-12-05T11:47:38.110' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c966a614-6afc-4e64-9cc8-c4bcd3730873', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'876ce37c-a5d6-4e37-a5dc-c72b289eb61a', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'b0ea83e7-658d-4c51-b159-e80055d2d45a', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'f1060183-3146-4b8b-9fca-ca1d83605a2e', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', NULL, N'386218d9-b79d-44e0-8d4f-73630da8254e')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8af3fdf8-4a30-413e-8ed8-ca300f245760', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'f0701063-ef8d-410e-bd4d-8cb85280ce38', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'e643878a-5ef7-47cb-ad00-ca90dd940944', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'ea6da64e-3afb-45cc-90fc-a193f6bb056d', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7b0666ea-fb51-40ed-8ba1-cbc509641aea', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'8aeac631-3853-4e5c-9eda-a755359c3125')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'43d9077d-dd98-4ad1-8072-cdd640ca6c0d', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'6120764f-e6a9-4c17-ab0a-e134e588cce9')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'88fc7c7d-0cb6-4002-a24f-ce98ebfd38b3', N'Ăn ở chi nhánh này khá nhiều\n- Vị trí: đa số các chi nhánh đều nhỏ nên dễ đi qua nếu kh để ý kỹ\n- Dịch vụ: bảo vệ khá nhiệt tình, nhân viên lau chùi dọn dẹp khá nhanh chóng\n- Chất lượng: đồ ăn khá ổn ...', 3.4, CAST(N'1990-10-10T00:00:00.000' AS DateTime), N'52da82fd-f624-4260-8617-00759c715d08', NULL, N'7f5a7217-2b62-4c03-b031-3111b8060fcd')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'fc3f9fe5-634e-42ec-be0e-cf3fd04c50d7', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7f69add3-5f3f-4214-82c2-cfc869bbdd01', N'1 sao', 0, CAST(N'2017-12-05T11:55:23.693' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'9e9d1485-2688-4a9c-ba0b-d337ca30d128', N'2 sao thoi', 2, CAST(N'2017-12-05T11:34:17.093' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'e6e6b33f-d931-464a-8a4a-dba432e3fa6b', N'Dở ẹt . 4 sao', 4, CAST(N'2017-12-23T16:28:16.740' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'0d46aa19-8d99-41d3-b46b-781be67f289b', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7981b5b3-ac99-44e5-9fb8-defbecd5441c', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'26c9a7ad-d8a8-4682-bd37-7d921bd4f8a5', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7dadf5f4-7312-418c-b312-df7f2d72f3a8', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'7dab9837-b4e7-40a5-b399-e0ac45fb3fe6', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'f6d69b54-0001-45e9-8c40-132f57e70a28')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'621b1580-780a-4bf0-9d1d-e445a1991307', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'5cce3c92-8059-4ab6-9b3a-adbd6d4f6218', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd556c33f-f2ca-4fef-a171-e48f58fd664d', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'c0768fcd-2861-4a6b-bef6-eae5e77732d3', N'Uống ko có ngon ji hết à', 2, CAST(N'2017-12-05T12:43:12.100' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'8ac6e2ee-cf52-4887-ba14-ef03fb89604d', N'1 sao nha mấy thím', 1, CAST(N'2017-12-05T11:58:03.920' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'2cf24510-07ac-482b-a41f-f25ffa67a5fe', N'svsve', 4, CAST(N'2017-12-27T14:20:59.823' AS DateTime), N'cc736f75-4b3f-457b-9110-2272455e282d', N'78050fc4-6a08-408f-aafb-1a0061f034d3', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd3cd3946-4060-45b2-8747-f34b5ffb696d', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', NULL, N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'910e459d-750c-4be5-912a-f397e094f5f2', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'8763981a-8e99-4001-82c8-aff574df8a5f')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'227b1ce5-aff7-4ef1-8a30-f3c012829415', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'2c89c409-28e1-4b81-acb7-9beb5a7349db', NULL, N'6c613d63-5c70-4aec-b224-104ad02751b4')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'd734459b-f48c-4f9a-90d3-f492164e61cb', N'
Combo trà sữa olong và bánh tiramisu ngon nhất trong các quán mình đi. Cứ vào đây là gọi 2 món này. Thích gì đâu luôn á. Nhân viên ở đây dễ thương, nhạc thì cực hay luôn', 4.8, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'19892089-46b2-4162-8c17-279f3cb7b02a', NULL, N'bd260acd-813e-46e6-a2fe-e1b767e7d957')
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'ccb76e6c-a84d-4a28-af10-f615bf0a2a19', N'Ăn ở chi nhánh này khá nhiều\n- Vị trí: đa số các chi nhánh đều nhỏ nên dễ đi qua nếu kh để ý kỹ\n- Dịch vụ: bảo vệ khá nhiệt tình, nhân viên lau chùi dọn dẹp khá nhanh chóng\n- Chất lượng: đồ ăn khá ổn ...', 3.4, CAST(N'1990-10-10T00:00:00.000' AS DateTime), N'52da82fd-f624-4260-8617-00759c715d08', N'4fe23236-6626-4a56-96f1-394be861b1e0', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'4ad93d12-e2c8-44b9-b2c3-fb212096e1b4', N'Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'8b2ecf33-d075-4e1f-88bf-a5f77b17dc0e', NULL)
INSERT [dbo].[Reviews] ([Id], [ReviewContent], [Rating], [Date], [UserId], [ProductId], [StoreId]) VALUES (N'96fc1535-1ad3-461e-8a78-fb83d3bf6277', N'
Hẹn bạn ở đây, mình gọi trà sữa Olong và bánh tiramisu. Trà sữa thơm trà, béo và ngọt vì phải, nói chung là ngon. Còn bánh tiramisu khá béo, nhưng hơi ngọt, chắc tại mình uống trà sữa đã thấy ngọt mà ...', 4.2, CAST(N'2017-09-10T09:30:00.000' AS DateTime), N'b59f4110-239c-4005-b10c-2f410996ec5d', N'4fe23236-6626-4a56-96f1-394be861b1e0', N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'e81053ab-e719-4818-bb23-20569e995599', N'6120764f-e6a9-4c17-ab0a-e134e588cce9', N'7b44ae56-f1d8-4c08-82f6-05dc95537048')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'017ada18-2b2c-4805-b77a-2963e97676a2', N'1bfa683d-e532-4a97-bf38-65e0a3962966', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'd6c2c352-45ff-46b2-b9d2-2ec2a4f984ca', N'386218d9-b79d-44e0-8d4f-73630da8254e', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'ea5ed28f-33d8-47cd-83ad-45ff1c66b5ba', N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e', N'3d31cc2c-d35b-454c-bab6-3640240a8ded')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'fb44a718-1ec4-43cf-83ca-467858697638', N'bd260acd-813e-46e6-a2fe-e1b767e7d957', N'f5e62f89-553b-4ac9-988c-4282743b2598')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'8d62d44f-1c30-45a2-a858-6284960948dd', N'8763981a-8e99-4001-82c8-aff574df8a5f', N'afd2b192-cb67-49a2-90fa-471fa51f4d5c')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'57333684-e03b-451c-b67b-7e671be1e8f1', N'688c8198-3442-40af-b98c-4d02c37d091d', N'1f4c2921-6ac2-4730-860b-6e1e69723ac9')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'a26dc639-2edb-437c-804a-8f135fc1e5c8', N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c', N'dd77b272-e035-4a35-9f3a-9a9b1307bebc')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'352078a1-a1a2-4ca3-ba65-c77afdd11855', N'7f5a7217-2b62-4c03-b031-3111b8060fcd', N'a7cd2f53-f641-4374-a686-b9900e29384d')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'0c3fd761-a337-4718-b969-cf77b28f46c7', N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e', N'f0c56bed-4513-4a8e-a41d-cec295d4bff5')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'd7375b45-cb56-4080-9762-e129a50524af', N'f6d69b54-0001-45e9-8c40-132f57e70a28', N'5821e479-033d-4f3f-a74e-9ced40a76001')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'45c146f4-dbaf-4cc6-87f5-e655e121e46e', N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b', N'9a6db159-cb0d-47f3-b06c-5e8f7ff4c9c7')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'683f9f67-cdb5-4dbe-b808-f31fc9b85f1e', N'6c613d63-5c70-4aec-b224-104ad02751b4', N'4b46d043-9644-40e1-93ac-2ef5261088ce')
INSERT [dbo].[StoreImages] ([Id], [StoreId], [ImageId]) VALUES (N'61529da1-b336-4c1f-b177-fd45445a3d5f', N'8aeac631-3853-4e5c-9eda-a755359c3125', N'a7e2b5d0-36dc-4676-a9bb-0b807b67ae95')
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'f29c2cb3-d3bc-4bea-9f55-0249f79293a4', N'Shop', NULL, CAST(N'06:00:00' AS Time), CAST(N'21:30:00' AS Time), CAST(12000 AS Decimal(8, 0)), CAST(25000 AS Decimal(8, 0)), N'ko có ji để mô tả', CAST(N'2017-12-19' AS Date), N'123 3/2', N'3', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'12f3db39-e8d0-4160-b53e-0c574367b638', N'Shop3', NULL, CAST(N'07:00:00' AS Time), CAST(N'09:30:00' AS Time), CAST(10000 AS Decimal(8, 0)), CAST(130000 AS Decimal(8, 0)), N'.....', CAST(N'2017-12-19' AS Date), N'12e elfnwnf', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'6c613d63-5c70-4aec-b224-104ad02751b4', N'Monkey In Black Cafe - Trần Quang Khải', 4.3, CAST(N'08:00:00' AS Time), CAST(N'22:00:00' AS Time), CAST(35000 AS Decimal(8, 0)), CAST(150000 AS Decimal(8, 0)), N'Hệ thống Monkey In Black Cafe', CAST(N'2016-05-25' AS Date), N'263 Trần Quang Khải, P. Tân Định', N'Quận 1', N'Hồ Chí Minh', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'f6d69b54-0001-45e9-8c40-132f57e70a28', N'
Bánh Mì 1 Phút 30 Giây - Sư Vạn Hạnh
', 3.6, CAST(N'08:00:00' AS Time), CAST(N'16:30:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(50000 AS Decimal(8, 0)), N'
Hệ thống Bánh Mì 1 Phút 30 Giây
', CAST(N'2017-04-23' AS Date), N'
738 Sư Vạn Hạnh Q.10
', N'Quận 10', N'Hồ Chí Minh', N'a1cc3b6d-d720-46c6-b48f-0934a95d1b68', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'c9e3ce88-affe-4542-aa57-1e31459d236f', N'fawfaw', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(6161 AS Decimal(8, 0)), CAST(13131 AS Decimal(8, 0)), N'fwefwa', CAST(N'0001-01-01' AS Date), N'313', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'bc83d23d-034b-42f7-846c-1f9d4e4f3c7e', N'awfwaf', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(2 AS Decimal(8, 0)), CAST(2 AS Decimal(8, 0)), N'ff', CAST(N'0001-01-01' AS Date), N'413513', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'2487f150-cc97-45dc-bbdd-21d28b73acc0', N'fàw', NULL, CAST(N'06:00:00' AS Time), CAST(N'07:30:00' AS Time), CAST(13 AS Decimal(8, 0)), CAST(15 AS Decimal(8, 0)), N'dqd', CAST(N'2017-12-20' AS Date), N'dqwd', N'2', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'a0dda778-1cec-4af0-b5e6-2fb6f924fd55', N'Shop111', NULL, CAST(N'06:00:00' AS Time), CAST(N'23:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(18900 AS Decimal(8, 0)), N'fafawf', CAST(N'2017-12-20' AS Date), N'fwfw', N'1', N'1', N'7914f9dc-c679-4661-acca-074821678f02', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'7f5a7217-2b62-4c03-b031-3111b8060fcd', N'Hanuri - Quán Ăn Hàn Quốc - Sư Vạn Hạnh', 4.3, CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time), CAST(35000 AS Decimal(8, 0)), CAST(120000 AS Decimal(8, 0)), N'Hệ thống Hanuri - Món Ăn Hàn Quốc', CAST(N'2017-10-22' AS Date), N'405A Sư Vạn Hạnh  P.12', N'Quận 10', N'Hồ Chí Minh', N'03485570-4e7c-4dd1-ac46-4fb36f86de6f', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'9b5de168-d8ab-45c6-a465-3297811c8e6b', N'Shop2', NULL, CAST(N'06:00:00' AS Time), CAST(N'06:00:00' AS Time), CAST(12000 AS Decimal(8, 0)), CAST(13000 AS Decimal(8, 0)), N'...', CAST(N'2017-12-19' AS Date), N'123 fafwa', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'04c80f59-da62-4496-8dbc-34481eba3940', N'TestDropDown', NULL, CAST(N'06:30:00' AS Time), CAST(N'12:30:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(15000 AS Decimal(8, 0)), N'this í...', CAST(N'2017-12-26' AS Date), N'13 Le Lai', N'4', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', N'4c304d4b-4265-4c38-b10a-91e74b525453')
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'1770e137-04a3-4c80-9abe-345d001ca997', N'fawef', NULL, CAST(N'06:00:00' AS Time), CAST(N'08:00:00' AS Time), CAST(13 AS Decimal(8, 0)), CAST(15 AS Decimal(8, 0)), N'dwead', CAST(N'2017-12-20' AS Date), N'dd', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'79ae2ad9-d5d0-4bf0-b5c6-3f123e97080c', N'Đen Đá Cafe - Trà Sữa & Trà Đào - Hàm Nghi', 4, CAST(N'08:00:00' AS Time), CAST(N'21:00:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(70000 AS Decimal(8, 0)), N'Hệ thống Đen Đá Cafe', CAST(N'2016-05-25' AS Date), N'96 Hàm Nghi', N'Quận 1', N'Hồ Chí Minh', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'0efbf011-52ed-4263-a2e8-4124ed88dfa9', N'New', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(15000 AS Decimal(8, 0)), N'ffaw f', CAST(N'0001-01-01' AS Date), N'135', N'24', N'2', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'ae8392ee-c5dd-433a-8e79-48fda53fcf28', N'Effoc Coffee', NULL, CAST(N'07:03:00' AS Time), CAST(N'07:03:00' AS Time), CAST(25000 AS Decimal(8, 0)), CAST(60000 AS Decimal(8, 0)), N'Trà sữa cho giới trẻ....', CAST(N'2017-12-11' AS Date), N'172 Bàu Cát', N'18', N'1', N'166f264f-807c-4598-8d87-495a337d457c', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'688c8198-3442-40af-b98c-4d02c37d091d', N'
Bún Đậu Cuốn Miền Tây
', 4.6, CAST(N'09:00:00' AS Time), CAST(N'21:30:00' AS Time), CAST(30000 AS Decimal(8, 0)), CAST(50000 AS Decimal(8, 0)), N'
Hệ thống
', CAST(N'2017-04-23' AS Date), N'
830 - 10A2 Sư Vạn Hạnh Nối Dài, P. 12
', N'Quận 10', N'Hồ Chí Minh', N'a1cc3b6d-d720-46c6-b48f-0934a95d1b68', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'cf5c4694-821a-4ba3-bd12-5389efb7ca08', N'Hình Như Là 2', NULL, CAST(N'06:00:00' AS Time), CAST(N'23:00:00' AS Time), CAST(32000 AS Decimal(8, 0)), CAST(6000 AS Decimal(8, 0)), N'Cafe chân dài SG', CAST(N'2017-12-26' AS Date), N'64 Cửu Long', N'10', N'1', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'cc736f75-4b3f-457b-9110-2272455e282d')
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'fd7f2957-6db4-47cc-a254-592f9d2b64d9', N'Tohi Coffee', NULL, CAST(N'06:00:00' AS Time), CAST(N'22:30:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(43000 AS Decimal(8, 0)), N'Cafe ngon nhất với giá cả hợp lý', CAST(N'2017-12-12' AS Date), N'63 đường số 2', N'14', N'1', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'e9aaadcd-b57f-4e10-bd80-5e1340a6fc1f', N'ffwaefw', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(15000 AS Decimal(8, 0)), N'dww', CAST(N'0001-01-01' AS Date), N'135', N'24', N'2', N'7914f9dc-c679-4661-acca-074821678f02', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'3cc7ca06-5810-43a4-adfe-609d11c74720', N'fằ', NULL, CAST(N'07:00:00' AS Time), CAST(N'09:30:00' AS Time), CAST(13 AS Decimal(8, 0)), CAST(15 AS Decimal(8, 0)), N'dwqd', CAST(N'2017-12-20' AS Date), N'fwèw', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'0aef06f6-56e4-41f2-b368-625af20ea638', N'tằ', NULL, CAST(N'06:00:00' AS Time), CAST(N'10:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(15000 AS Decimal(8, 0)), N'dqd', CAST(N'2017-12-20' AS Date), N'dw12e', N'2', N'1', N'7914f9dc-c679-4661-acca-074821678f02', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'7f3171c9-81c0-47fc-99a1-648258c41b08', N'fafw', NULL, CAST(N'06:00:00' AS Time), CAST(N'06:00:00' AS Time), CAST(151 AS Decimal(8, 0)), CAST(111 AS Decimal(8, 0)), N'fwaef', CAST(N'2017-12-20' AS Date), N'dwdaw', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'1bfa683d-e532-4a97-bf38-65e0a3962966', N'Trà Sữa Gong Cha - 貢茶 - Hồ Tùng Mậu', 3.2, CAST(N'09:00:00' AS Time), CAST(N'22:30:00' AS Time), CAST(40000 AS Decimal(8, 0)), CAST(200000 AS Decimal(8, 0)), N'
Hệ thống Trà Sữa Gong Cha
', CAST(N'2017-04-23' AS Date), N'
79 Hồ Tùng Mậu
', N'Quận 1', N'Hồ Chí Minh', N'166f264f-807c-4598-8d87-495a337d457c', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'c8893a36-77c2-4e4d-845e-68a0a22a9a24', N'New SHop 10', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(15000 AS Decimal(8, 0)), N'this is...', CAST(N'0001-01-01' AS Date), N'135', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'a5f98343-f1dd-4a5f-970d-709f9e9e95f5', N'tăf', NULL, CAST(N'06:03:00' AS Time), CAST(N'13:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(15000 AS Decimal(8, 0)), N'fwèằ', CAST(N'2017-12-11' AS Date), N'ffqè', N'26', N'2', N'7914f9dc-c679-4661-acca-074821678f02', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'386218d9-b79d-44e0-8d4f-73630da8254e', N'
TocoToco Bubble Tea - Sư Vạn Hạnh
', 3.7, CAST(N'09:00:00' AS Time), CAST(N'20:30:00' AS Time), CAST(25000 AS Decimal(8, 0)), CAST(100000 AS Decimal(8, 0)), N'
Hệ thống Toco Toco Bubble Tea - Hồ Chí Minh
', CAST(N'2017-04-23' AS Date), N'
770B Sư Vạn Hạnh, P. 10
', N'Quận 10', N'Hồ Chí Minh', N'166f264f-807c-4598-8d87-495a337d457c', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'8b3dde36-79ba-426f-ba3f-77c8c7877a1e', N'Morico - Modern Japanese Restaurant Cafe - Lê Lợi', 3.3, CAST(N'09:00:00' AS Time), CAST(N'22:00:00' AS Time), CAST(35000 AS Decimal(8, 0)), CAST(150000 AS Decimal(8, 0)), N'Hệ thống Morico - Modern Japanese Restaurant Cafe - Dessert', CAST(N'2017-05-22' AS Date), N'30 Lê Lợi, P. Bến Nghé', N'Quận 1', N'Hồ Chí Minh', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'26adfb2d-9963-4f16-bae2-79623fe3dcda', N'Tuan', NULL, CAST(N'06:30:00' AS Time), CAST(N'22:30:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(31000 AS Decimal(8, 0)), N'Ko cos mo ta nao ca...', CAST(N'2017-12-26' AS Date), N'123 Le Lai', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'32d1f6e2-9c12-47c7-aca6-7bc11b62da0e', N'
Habbit Coffee
', 3.6, CAST(N'09:00:00' AS Time), CAST(N'21:30:00' AS Time), CAST(20000 AS Decimal(8, 0)), CAST(100000 AS Decimal(8, 0)), N'
Hệ thống bánh
', CAST(N'2017-04-23' AS Date), N'
Hẻm 824 Sư Vạn Hạnh, P. 12
', N'Quận 10', N'Hồ Chí Minh', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'8afdcb58-70a9-478a-8ddc-86f890240649', N'Tohi Coffee 1', NULL, CAST(N'06:00:00' AS Time), CAST(N'19:30:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(45000 AS Decimal(8, 0)), N'Ngon bổ rẻ', CAST(N'2017-12-12' AS Date), N'135 Đường số 2', N'1', N'1', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'45215af5-537b-4e01-a358-87d682e1ec94', N'New Shop', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(12000 AS Decimal(8, 0)), CAST(20000 AS Decimal(8, 0)), N'ffawe faw faw ', CAST(N'0001-01-01' AS Date), N'123 Le Lai', N'1', N'1', N'a1cc3b6d-d720-46c6-b48f-0934a95d1b68', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'c88080f4-93c6-439f-9c4c-88f32e4c2067', N'New Shop 7', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(5000 AS Decimal(8, 0)), N'this is...', CAST(N'0001-01-01' AS Date), N'135', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'ee00b544-6980-4e20-94af-89a09d88dc57', N'New', NULL, CAST(N'06:30:00' AS Time), CAST(N'21:30:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(64000 AS Decimal(8, 0)), N'ko co mo ta nao ca', CAST(N'2017-12-26' AS Date), N'123 Tran Nao', N'2', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'e65b1525-9e78-48fd-b671-8cca6517246c', N'Hình Như Là 2', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(32000 AS Decimal(8, 0)), CAST(6000 AS Decimal(8, 0)), N'Cafe chân dài SG', CAST(N'2017-12-26' AS Date), N'64 Cửu Long', N'10', N'1', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'cc736f75-4b3f-457b-9110-2272455e282d')
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'0b9c2295-9cdc-4548-99a2-8e227a7b7a60', N'New Shop 10', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(25000 AS Decimal(8, 0)), N'this is...', CAST(N'0001-01-01' AS Date), N'135', N'3', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'15d84d2b-20c6-453b-a6f3-9db5d9b91777', N'Shop4', NULL, CAST(N'07:30:00' AS Time), CAST(N'09:00:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(16000 AS Decimal(8, 0)), N'....', CAST(N'2017-12-19' AS Date), N'r12e21vw', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'0e3d1c2f-4793-4aa9-9baa-9de487686a27', N'Urban Station', NULL, CAST(N'06:30:00' AS Time), CAST(N'18:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(30000 AS Decimal(8, 0)), N'this is.....', CAST(N'2017-12-11' AS Date), N'138 Tran Nao', N'2', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'2504ef5a-436e-4c7c-9bc6-9e89792834bb', N'gaf', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(13000 AS Decimal(8, 0)), CAST(15000 AS Decimal(8, 0)), N'dqwdq', CAST(N'0001-01-01' AS Date), N'135', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'9a7ea9c6-2a30-487d-b7fc-a636c3781a2b', N'Buzza Pizza - Nguyễn Trung Trực', 4.2, CAST(N'09:00:00' AS Time), CAST(N'22:30:00' AS Time), CAST(40000 AS Decimal(8, 0)), CAST(250000 AS Decimal(8, 0)), N'
Hệ thống Buzza Pizza
', CAST(N'2017-04-23' AS Date), N'
5 - 7 - 9 Nguyễn Trung Trực
', N'Quận 1', N'Hồ Chí Minh', N'0cc7aa64-2bac-4f04-a643-727f3ceae5d3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'8aeac631-3853-4e5c-9eda-a755359c3125', N'
Sinh Tố \u0026 Trà
', 3.7, CAST(N'09:00:00' AS Time), CAST(N'20:30:00' AS Time), CAST(25000 AS Decimal(8, 0)), CAST(100000 AS Decimal(8, 0)), N'
Hệ thống Toco Toco Bubble Tea - Hồ Chí Minh
', CAST(N'2017-04-23' AS Date), N'
824/2 Sư Vạn Hạnh, P. 12
', N'Quận 10', N'Hồ Chí Minh', N'166f264f-807c-4598-8d87-495a337d457c', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'96f9acd3-3d5e-40b3-854d-ae99d2b0304a', N'shop3', NULL, CAST(N'06:30:00' AS Time), CAST(N'08:00:00' AS Time), CAST(123 AS Decimal(8, 0)), CAST(23 AS Decimal(8, 0)), N'wà', CAST(N'2017-12-20' AS Date), N'dq', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'8763981a-8e99-4001-82c8-aff574df8a5f', N'Pizza 4P’s - Pizza Kiểu Nhật - Lê Thánh Tôn', 4.5, CAST(N'09:00:00' AS Time), CAST(N'21:30:00' AS Time), CAST(45000 AS Decimal(8, 0)), CAST(250000 AS Decimal(8, 0)), N'Hệ thống Pizza 4P’s - Pizza Kiểu Nhật', CAST(N'2017-04-23' AS Date), N'
8/15 Lê Thánh Tôn, P. Bến Nghé
', N'Quận 1', N'Hồ Chí Minh', N'0cc7aa64-2bac-4f04-a643-727f3ceae5d3', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'cd46d086-06eb-4ef4-aff5-b0f2f87aa663', N'Hachiko', NULL, CAST(N'07:30:00' AS Time), CAST(N'22:30:00' AS Time), CAST(19000 AS Decimal(8, 0)), CAST(29000 AS Decimal(8, 0)), N'Cafe chó mew dễ thương nhứt quả đất', CAST(N'2017-12-26' AS Date), N'123 đường 3/2', N'6', N'1', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'7fd023e7-b320-484f-b6d8-593dfa49571d')
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'a7f6db28-e358-457c-90ce-b11d54ea18f0', N'Test12', NULL, CAST(N'06:00:00' AS Time), CAST(N'06:00:00' AS Time), CAST(12 AS Decimal(8, 0)), CAST(13 AS Decimal(8, 0)), N'ffwaf', CAST(N'2017-12-12' AS Date), N'12', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'651fa551-13f0-40ef-803b-b3d44e1e97ab', N'New Shop 8', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(12000 AS Decimal(8, 0)), CAST(23000 AS Decimal(8, 0)), N'ths is...', CAST(N'0001-01-01' AS Date), N'196', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'e5777b60-59c9-43ef-b85f-bb7e586abef0', N'daawc', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(13500 AS Decimal(8, 0)), CAST(1510 AS Decimal(8, 0)), N'dewdw', CAST(N'0001-01-01' AS Date), N'135', N'25', N'2', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'3be58863-c8a4-439c-87b0-c2f4f4ca9396', N'New SHop 9', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(16000 AS Decimal(8, 0)), CAST(35000 AS Decimal(8, 0)), N'this is..', CAST(N'0001-01-01' AS Date), N'123', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'60514799-be0c-48dc-9fa5-d13806101b81', N'fafa', NULL, CAST(N'09:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(11 AS Decimal(8, 0)), CAST(11 AS Decimal(8, 0)), N'ddd', CAST(N'0001-01-01' AS Date), N'fff', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'2dcbd322-c4e1-4571-ab88-d31b190f54bb', N'New Shop 6', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(12000 AS Decimal(8, 0)), CAST(30000 AS Decimal(8, 0)), N'this is...', CAST(N'0001-01-01' AS Date), N'132', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'bdb1b5fd-22a9-461c-8dd7-dc5248bb2152', N'TestImage', NULL, CAST(N'06:00:00' AS Time), CAST(N'17:00:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(25000 AS Decimal(8, 0)), N'this is...', CAST(N'2017-12-20' AS Date), N'123 Le Lai', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'6120764f-e6a9-4c17-ab0a-e134e588cce9', N'
Bánh Trung Thu Hồng Kông - Shop Online
', 3.7, CAST(N'09:00:00' AS Time), CAST(N'20:30:00' AS Time), CAST(25000 AS Decimal(8, 0)), CAST(100000 AS Decimal(8, 0)), N'
Hệ thống bánh
', CAST(N'2017-04-23' AS Date), N'
824/9 Sư Vạn Hạnh, P. 13
', N'Quận 10', N'Hồ Chí Minh', N'a1cc3b6d-d720-46c6-b48f-0934a95d1b68', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'bd260acd-813e-46e6-a2fe-e1b767e7d957', N'
Hallyu - Korean Fast Food
', 3.5, CAST(N'09:00:00' AS Time), CAST(N'20:30:00' AS Time), CAST(20000 AS Decimal(8, 0)), CAST(100000 AS Decimal(8, 0)), N'
Hệ thống Hallyu - Korean Fast Food
', CAST(N'2017-04-23' AS Date), N'
7 Trần Minh Quyền, P. 10
', N'Quận 10', N'Hồ Chí Minh', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'5f40cc85-d8f9-48b0-b453-e42e62ee29ba', N'Shop112', NULL, CAST(N'06:00:00' AS Time), CAST(N'22:00:00' AS Time), CAST(15000 AS Decimal(8, 0)), CAST(35000 AS Decimal(8, 0)), N'this is mo ta...', CAST(N'2017-12-20' AS Date), N'123 Thanh Thai', N'10', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'b822e1f5-5aa8-4a51-9d92-ebfaaaecebcb', N'Hình Như Là Café', NULL, CAST(N'07:30:00' AS Time), CAST(N'23:30:00' AS Time), CAST(32000 AS Decimal(8, 0)), CAST(78000 AS Decimal(8, 0)), N'Café chân dài Sài Gòn', CAST(N'2017-12-26' AS Date), N'64 Cửu Long', N'10', N'1', N'29f7df5d-a7f8-4abf-bd27-c64839f9d4a3', N'cc736f75-4b3f-457b-9110-2272455e282d')
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'f35f1290-f098-4f04-b158-f47cc8dbdcbe', N'Shop1', NULL, CAST(N'07:00:00' AS Time), CAST(N'10:00:00' AS Time), CAST(12000 AS Decimal(8, 0)), CAST(13000 AS Decimal(8, 0)), N'...', CAST(N'2017-12-19' AS Date), N'123 Le Lai', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'f2180e05-d2d7-43a7-b76f-f79f458a506d', N'New Shop 12', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(30000 AS Decimal(8, 0)), CAST(50000 AS Decimal(8, 0)), N'ewafawef', CAST(N'0001-01-01' AS Date), N'135', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
INSERT [dbo].[Stores] ([Id], [Name], [Rating], [OpenHour], [CloseHour], [LowestPrice], [HighestPrice], [Description], [RegistrationDate], [Address], [District], [City], [CategoryId], [UserId]) VALUES (N'36c1c11e-690f-4e07-a5bf-f93320f24364', N'New Shop 4', NULL, CAST(N'00:00:00' AS Time), CAST(N'00:00:00' AS Time), CAST(12000 AS Decimal(8, 0)), CAST(23000 AS Decimal(8, 0)), N'this is ....', CAST(N'0001-01-01' AS Date), N'0196', N'1', N'1', N'65480383-c9ce-43e7-a4c4-00b926c57828', NULL)
SET IDENTITY_INSERT [dbo].[Tokens] ON 

INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (1, N'52da82fd-f624-4260-8617-00759c715d08', N'b2b4ae51-7963-4dbf-9f72-54e046b0d391', CAST(N'2017-11-10T15:48:54.763' AS DateTime), CAST(N'2017-11-10T15:48:54.763' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (2, N'cc736f75-4b3f-457b-9110-2272455e282d', N'bb9e2544-7935-476b-b6dc-8fd58e281269', CAST(N'2017-11-10T16:31:47.473' AS DateTime), CAST(N'2017-11-10T16:46:47.473' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (3, N'19892089-46b2-4162-8c17-279f3cb7b02a', N'f2e64033-f04f-44e3-bfac-3781b9095497', CAST(N'2017-11-10T16:52:48.127' AS DateTime), CAST(N'2017-11-10T17:22:48.127' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (4, N'cc736f75-4b3f-457b-9110-2272455e282d', N'a9b7d432-8718-40cd-8733-7af27961f749', CAST(N'2017-11-13T12:04:58.087' AS DateTime), CAST(N'2017-11-14T13:04:58.087' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (5, N'cc736f75-4b3f-457b-9110-2272455e282d', N'62d51ff5-5205-42a8-b16b-9c4a946d1ca5', CAST(N'2017-11-13T13:17:51.060' AS DateTime), CAST(N'2017-11-14T14:17:51.060' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (6, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f1abea9f-2f63-429b-9e18-fca5052ccb96', CAST(N'2017-11-20T12:58:06.680' AS DateTime), CAST(N'2017-11-21T13:58:06.680' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (7, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9ba8733a-4a30-4573-bf88-5a0ff1bdc8e9', CAST(N'2017-11-20T13:11:03.183' AS DateTime), CAST(N'2017-11-21T14:11:03.183' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (8, N'cc736f75-4b3f-457b-9110-2272455e282d', N'a4ecb059-4b2c-4ada-a4e8-0ef5a717b989', CAST(N'2017-11-20T13:36:15.067' AS DateTime), CAST(N'2017-11-21T14:36:15.067' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (9, N'cc736f75-4b3f-457b-9110-2272455e282d', N'81dad6b5-b50c-4593-a35c-8436aa5a3c12', CAST(N'2017-11-20T13:36:30.840' AS DateTime), CAST(N'2017-11-21T14:36:30.840' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (10, N'cc736f75-4b3f-457b-9110-2272455e282d', N'e0518427-e162-4e45-9bb1-ec13291cdcaa', CAST(N'2017-11-20T13:42:18.013' AS DateTime), CAST(N'2017-11-21T14:42:18.013' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (11, N'cc736f75-4b3f-457b-9110-2272455e282d', N'e9ffab3c-0661-472a-b197-f88a731bed0f', CAST(N'2017-11-20T13:43:27.283' AS DateTime), CAST(N'2017-11-21T14:43:27.283' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (12, N'cc736f75-4b3f-457b-9110-2272455e282d', N'cb69f4d2-79d9-40f1-a2fb-87fb9d479c0a', CAST(N'2017-11-20T13:43:35.303' AS DateTime), CAST(N'2017-11-21T14:43:35.303' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (13, N'cc736f75-4b3f-457b-9110-2272455e282d', N'32468e00-6f58-46fc-bdbe-4573fe812ef8', CAST(N'2017-11-20T13:44:30.383' AS DateTime), CAST(N'2017-11-21T14:44:30.383' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (14, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b3e08c04-bff0-4928-86f9-d58beb121e7c', CAST(N'2017-11-20T13:44:56.887' AS DateTime), CAST(N'2017-11-21T14:44:56.887' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (15, N'cc736f75-4b3f-457b-9110-2272455e282d', N'2dfd32bd-9ca4-42a5-b314-cfc25314de50', CAST(N'2017-11-20T13:45:02.490' AS DateTime), CAST(N'2017-11-21T14:45:02.490' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (16, N'cc736f75-4b3f-457b-9110-2272455e282d', N'897dd9e2-996c-4ca5-bb73-c8c3e283a4fe', CAST(N'2017-11-20T13:45:24.207' AS DateTime), CAST(N'2017-11-21T14:45:24.207' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (17, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b8608843-9309-4c91-a086-aa54fea6f1d3', CAST(N'2017-11-20T13:45:35.610' AS DateTime), CAST(N'2017-11-21T14:45:35.610' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (18, N'cc736f75-4b3f-457b-9110-2272455e282d', N'30047755-2b62-436c-8d6b-24bcb7347da6', CAST(N'2017-11-20T13:45:42.647' AS DateTime), CAST(N'2017-11-21T14:45:42.647' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (19, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0324a6ec-f22c-4227-ad6e-bdcf30c46919', CAST(N'2017-11-20T14:04:38.250' AS DateTime), CAST(N'2017-11-21T15:04:38.250' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (20, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0da37350-5a12-4e7c-85f6-78d1301305dd', CAST(N'2017-11-20T14:05:45.433' AS DateTime), CAST(N'2017-11-21T15:05:45.433' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (21, N'cc736f75-4b3f-457b-9110-2272455e282d', N'e1878036-3d1b-4424-8c59-d58f65dc4dbc', CAST(N'2017-11-20T14:05:45.497' AS DateTime), CAST(N'2017-11-21T15:05:45.497' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (22, N'cc736f75-4b3f-457b-9110-2272455e282d', N'84d9b7ca-676f-4aa7-a0ac-57ac7681f44b', CAST(N'2017-11-20T14:08:05.690' AS DateTime), CAST(N'2017-11-21T15:08:05.690' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (23, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4d352099-f190-4e70-9373-37b11fae2d85', CAST(N'2017-11-20T14:08:05.883' AS DateTime), CAST(N'2017-11-21T15:08:05.883' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (24, N'cc736f75-4b3f-457b-9110-2272455e282d', N'594ef6ff-9a5d-4df1-bde2-1a96f065b69e', CAST(N'2017-11-20T14:09:18.867' AS DateTime), CAST(N'2017-11-21T15:09:18.867' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (25, N'cc736f75-4b3f-457b-9110-2272455e282d', N'76d256db-1e21-472c-bb11-b042188c3ce8', CAST(N'2017-11-20T14:11:30.523' AS DateTime), CAST(N'2017-11-21T15:11:30.523' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (26, N'cc736f75-4b3f-457b-9110-2272455e282d', N'1054a081-12e4-4fb8-9791-1ee67d32e2ab', CAST(N'2017-11-20T14:11:30.573' AS DateTime), CAST(N'2017-11-21T15:11:30.573' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (27, N'cc736f75-4b3f-457b-9110-2272455e282d', N'abb3bca6-9850-428b-9886-a9f1ea88d636', CAST(N'2017-11-20T14:11:46.923' AS DateTime), CAST(N'2017-11-21T15:11:46.923' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (28, N'cc736f75-4b3f-457b-9110-2272455e282d', N'20b5e7d9-6d24-4bce-85ed-fb433b090b88', CAST(N'2017-11-20T14:19:32.023' AS DateTime), CAST(N'2017-11-21T15:19:32.023' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (29, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0bf01de5-a446-4ac5-9ed7-3a63d2443d4d', CAST(N'2017-11-20T14:19:32.097' AS DateTime), CAST(N'2017-11-21T15:19:32.097' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (30, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4f0eca74-8cd5-4e1b-8b12-7e2785ee6ee9', CAST(N'2017-11-20T14:20:08.873' AS DateTime), CAST(N'2017-11-21T15:20:08.873' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (31, N'cc736f75-4b3f-457b-9110-2272455e282d', N'6471393d-3a2b-44d7-91b6-03143da8484e', CAST(N'2017-11-20T14:23:42.640' AS DateTime), CAST(N'2017-11-21T15:23:42.640' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (32, N'cc736f75-4b3f-457b-9110-2272455e282d', N'1a9ebad8-5450-4d19-b9bb-9995bb56e67b', CAST(N'2017-11-20T14:25:05.243' AS DateTime), CAST(N'2017-11-21T15:25:05.243' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (33, N'cc736f75-4b3f-457b-9110-2272455e282d', N'8b913156-f425-496b-8ce1-1d0168e06d00', CAST(N'2017-11-20T14:29:33.357' AS DateTime), CAST(N'2017-11-21T15:29:33.357' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (34, N'cc736f75-4b3f-457b-9110-2272455e282d', N'19754d40-7b54-4d9c-a810-be2f09f278ed', CAST(N'2017-11-20T14:29:51.657' AS DateTime), CAST(N'2017-11-21T15:29:51.657' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (35, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b76003fb-24be-473e-b183-84b579599418', CAST(N'2017-11-20T14:31:44.800' AS DateTime), CAST(N'2017-11-21T15:31:44.800' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (36, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f62a9a37-4ad2-405b-827b-7d8fbc26490a', CAST(N'2017-11-20T14:31:53.787' AS DateTime), CAST(N'2017-11-21T15:31:53.787' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (37, N'cc736f75-4b3f-457b-9110-2272455e282d', N'6d399937-a711-4b21-9c10-263c9790c03a', CAST(N'2017-11-20T14:31:53.903' AS DateTime), CAST(N'2017-11-21T15:31:53.903' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (38, N'cc736f75-4b3f-457b-9110-2272455e282d', N'cf917c2a-51dc-4280-bc0a-866b48cad62c', CAST(N'2017-11-20T14:32:14.277' AS DateTime), CAST(N'2017-11-21T15:32:14.277' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (39, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0d08c888-f9ca-4d24-b04f-5e9b0b64fb4d', CAST(N'2017-11-20T14:32:20.293' AS DateTime), CAST(N'2017-11-21T15:32:20.293' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (40, N'cc736f75-4b3f-457b-9110-2272455e282d', N'd0ea9f7a-a404-47ca-8619-44f7afcb5f9e', CAST(N'2017-11-20T14:32:20.503' AS DateTime), CAST(N'2017-11-21T15:32:20.503' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (41, N'cc736f75-4b3f-457b-9110-2272455e282d', N'a6ffccf1-53d5-4a5a-8b36-a53c834f95fc', CAST(N'2017-11-20T14:33:04.190' AS DateTime), CAST(N'2017-11-21T15:33:04.190' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (42, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5a7ecb40-1e2b-400a-a508-104d7f9512c0', CAST(N'2017-11-20T14:33:10.520' AS DateTime), CAST(N'2017-11-21T15:33:10.520' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (43, N'cc736f75-4b3f-457b-9110-2272455e282d', N'88b14ac5-a243-44d9-9296-eac73c36fcb3', CAST(N'2017-11-20T14:33:10.763' AS DateTime), CAST(N'2017-11-21T15:33:10.763' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (44, N'cc736f75-4b3f-457b-9110-2272455e282d', N'd8c9423a-6805-4573-97a4-47ee99d7c02d', CAST(N'2017-11-20T14:34:08.573' AS DateTime), CAST(N'2017-11-21T15:34:08.573' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (45, N'cc736f75-4b3f-457b-9110-2272455e282d', N'06a835b9-b3cc-4428-ab75-68637e4ce828', CAST(N'2017-11-20T14:34:08.600' AS DateTime), CAST(N'2017-11-21T15:34:08.600' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (46, N'cc736f75-4b3f-457b-9110-2272455e282d', N'd7a209ed-2da9-46ea-aca3-f2d2111a8810', CAST(N'2017-11-20T14:34:13.920' AS DateTime), CAST(N'2017-11-21T15:34:13.920' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (47, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b681ff7e-60c5-474c-a952-f938416424b8', CAST(N'2017-11-20T14:34:13.927' AS DateTime), CAST(N'2017-11-21T15:34:13.927' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (48, N'cc736f75-4b3f-457b-9110-2272455e282d', N'599835f0-b23c-4afc-aee3-a769eb583a78', CAST(N'2017-11-20T14:34:14.053' AS DateTime), CAST(N'2017-11-21T15:34:14.053' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (49, N'cc736f75-4b3f-457b-9110-2272455e282d', N'08816a8c-2947-4031-8d48-5bd1d2644f0c', CAST(N'2017-11-20T14:34:14.053' AS DateTime), CAST(N'2017-11-21T15:34:14.053' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (50, N'cc736f75-4b3f-457b-9110-2272455e282d', N'6044b0c2-a02a-45f4-a031-8100e4194030', CAST(N'2017-11-20T14:35:11.340' AS DateTime), CAST(N'2017-11-21T15:35:11.340' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (51, N'cc736f75-4b3f-457b-9110-2272455e282d', N'3514c41c-9c22-4454-9f0d-246260126155', CAST(N'2017-11-20T14:35:11.423' AS DateTime), CAST(N'2017-11-21T15:35:11.423' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (52, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ffdcf1e8-319c-4141-8f96-f8860be3a472', CAST(N'2017-11-20T14:35:17.007' AS DateTime), CAST(N'2017-11-21T15:35:17.007' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (53, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9004aee7-92d1-40ab-9169-3f97b7873c75', CAST(N'2017-11-20T14:35:17.007' AS DateTime), CAST(N'2017-11-21T15:35:17.007' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (54, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9a64c814-2556-41b9-b14c-2a42bd142cd9', CAST(N'2017-11-20T14:35:17.203' AS DateTime), CAST(N'2017-11-21T15:35:17.203' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (55, N'cc736f75-4b3f-457b-9110-2272455e282d', N'703f0d7b-c405-45bc-9614-f55749a6eb36', CAST(N'2017-11-20T14:35:17.230' AS DateTime), CAST(N'2017-11-21T15:35:17.230' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (56, N'cc736f75-4b3f-457b-9110-2272455e282d', N'547ba238-b058-42ca-b4bd-c6e5f3662d44', CAST(N'2017-11-20T14:35:52.057' AS DateTime), CAST(N'2017-11-21T15:35:52.057' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (57, N'cc736f75-4b3f-457b-9110-2272455e282d', N'460d2c11-fa64-42a1-b705-fc22aac54163', CAST(N'2017-11-20T14:35:52.057' AS DateTime), CAST(N'2017-11-21T15:35:52.057' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (58, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9f6cfd51-5f38-4bc5-9574-8a0d293687a2', CAST(N'2017-11-20T14:35:58.057' AS DateTime), CAST(N'2017-11-21T15:35:58.057' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (59, N'cc736f75-4b3f-457b-9110-2272455e282d', N'62bf8cc4-15e4-4d09-ba99-221baaf8e557', CAST(N'2017-11-20T14:35:58.057' AS DateTime), CAST(N'2017-11-21T15:35:58.057' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (60, N'cc736f75-4b3f-457b-9110-2272455e282d', N'73c7cb4d-5574-4b5d-9b9c-9aa1db8cbbbe', CAST(N'2017-11-20T14:35:58.337' AS DateTime), CAST(N'2017-11-21T15:35:58.337' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (61, N'cc736f75-4b3f-457b-9110-2272455e282d', N'781e162d-17e9-4cab-a6f6-02c9115eeb29', CAST(N'2017-11-20T14:35:58.337' AS DateTime), CAST(N'2017-11-21T15:35:58.337' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (62, N'cc736f75-4b3f-457b-9110-2272455e282d', N'96524975-893f-4fb7-b242-b37fd2f4c006', CAST(N'2017-11-20T14:36:07.227' AS DateTime), CAST(N'2017-11-21T15:36:07.227' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (63, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b31a8cf7-400b-4fcf-a814-b7e9c36ca653', CAST(N'2017-11-20T14:36:07.223' AS DateTime), CAST(N'2017-11-21T15:36:07.223' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (64, N'cc736f75-4b3f-457b-9110-2272455e282d', N'93a72fe3-b83f-477e-ae8d-1e63a12b29c2', CAST(N'2017-11-20T14:36:12.533' AS DateTime), CAST(N'2017-11-21T15:36:12.533' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (65, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ef9ff4db-0702-4b18-a9a6-9cd264d82230', CAST(N'2017-11-20T14:36:12.540' AS DateTime), CAST(N'2017-11-21T15:36:12.540' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (66, N'cc736f75-4b3f-457b-9110-2272455e282d', N'8b3dd0e4-9308-46cb-b72e-14143d8053a8', CAST(N'2017-11-20T14:36:12.643' AS DateTime), CAST(N'2017-11-21T15:36:12.643' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (67, N'cc736f75-4b3f-457b-9110-2272455e282d', N'159e0e54-ccc7-41b2-ac1e-76d52ac94237', CAST(N'2017-11-20T14:36:12.663' AS DateTime), CAST(N'2017-11-21T15:36:12.663' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (68, N'cc736f75-4b3f-457b-9110-2272455e282d', N'64d41517-05dc-42ad-8070-3202ec5d94d7', CAST(N'2017-11-20T14:36:21.660' AS DateTime), CAST(N'2017-11-21T15:36:21.660' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (69, N'cc736f75-4b3f-457b-9110-2272455e282d', N'8fcb6d1d-4f4e-46c7-af8d-610071aaa9cc', CAST(N'2017-11-20T14:36:21.687' AS DateTime), CAST(N'2017-11-21T15:36:21.687' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (70, N'cc736f75-4b3f-457b-9110-2272455e282d', N'91c7e35a-ec51-4a6c-98c4-5dfdb816c4af', CAST(N'2017-11-20T14:36:26.973' AS DateTime), CAST(N'2017-11-21T15:36:26.973' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (71, N'cc736f75-4b3f-457b-9110-2272455e282d', N'bd8b9f37-8006-4f72-867c-0f2565f47efd', CAST(N'2017-11-20T14:36:27.013' AS DateTime), CAST(N'2017-11-21T15:36:27.013' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (72, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0c3ae3c6-84b1-4e08-af5e-9ab3471041dc', CAST(N'2017-11-20T14:36:27.277' AS DateTime), CAST(N'2017-11-21T15:36:27.277' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (73, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b09605a0-b197-47a9-9506-08cae6f1e62e', CAST(N'2017-11-20T14:36:27.277' AS DateTime), CAST(N'2017-11-21T15:36:27.277' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (74, N'cc736f75-4b3f-457b-9110-2272455e282d', N'fd057590-574b-4f36-bbdd-f3dee5cba686', CAST(N'2017-11-20T14:38:29.953' AS DateTime), CAST(N'2017-11-21T15:38:29.953' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (75, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ee80db8b-a2a5-4363-8b48-36b8d53ac15a', CAST(N'2017-11-20T14:38:29.960' AS DateTime), CAST(N'2017-11-21T15:38:29.960' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (76, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ca221591-10a1-45d7-a91b-114fdf8062c0', CAST(N'2017-11-20T14:38:34.533' AS DateTime), CAST(N'2017-11-21T15:38:34.533' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (77, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5ad9d50e-0872-4a09-b056-17350f66fc18', CAST(N'2017-11-20T14:38:34.533' AS DateTime), CAST(N'2017-11-21T15:38:34.533' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (78, N'cc736f75-4b3f-457b-9110-2272455e282d', N'6ce2ff9c-bf02-46b5-9a35-204fc461d9e4', CAST(N'2017-11-20T14:38:34.870' AS DateTime), CAST(N'2017-11-21T15:38:34.870' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (79, N'cc736f75-4b3f-457b-9110-2272455e282d', N'33be00c9-abd8-40f9-abb9-cb01061a58c7', CAST(N'2017-11-20T14:38:34.937' AS DateTime), CAST(N'2017-11-21T15:38:34.937' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (80, N'cc736f75-4b3f-457b-9110-2272455e282d', N'42f1db13-60ce-414e-81bf-53df03e59b5c', CAST(N'2017-11-20T14:38:58.750' AS DateTime), CAST(N'2017-11-21T15:38:58.750' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (81, N'cc736f75-4b3f-457b-9110-2272455e282d', N'6b2427a6-0c7a-4f9f-80ae-bd38e82c6083', CAST(N'2017-11-20T14:38:58.747' AS DateTime), CAST(N'2017-11-21T15:38:58.747' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (82, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5bc39515-fa06-4452-9d10-06afd06bc30d', CAST(N'2017-11-20T14:39:04.027' AS DateTime), CAST(N'2017-11-21T15:39:04.027' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (83, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ad1f3999-417f-4005-af0a-b4e54afc55b7', CAST(N'2017-11-20T14:39:04.027' AS DateTime), CAST(N'2017-11-21T15:39:04.027' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (84, N'cc736f75-4b3f-457b-9110-2272455e282d', N'fc2d963f-4924-4af4-bb25-a5f18cbc5ee7', CAST(N'2017-11-20T14:39:04.140' AS DateTime), CAST(N'2017-11-21T15:39:04.140' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (85, N'cc736f75-4b3f-457b-9110-2272455e282d', N'61fb0f4e-eb85-4a9b-9365-e8181b41b398', CAST(N'2017-11-20T14:39:04.137' AS DateTime), CAST(N'2017-11-21T15:39:04.137' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (86, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4ef9c434-d4d7-46c8-8081-7808464d3f4e', CAST(N'2017-11-20T14:40:19.677' AS DateTime), CAST(N'2017-11-21T15:40:19.677' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (87, N'cc736f75-4b3f-457b-9110-2272455e282d', N'fd3ea568-5240-4784-a19b-fafdc413db60', CAST(N'2017-11-20T14:40:19.680' AS DateTime), CAST(N'2017-11-21T15:40:19.680' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (88, N'cc736f75-4b3f-457b-9110-2272455e282d', N'c479f71d-d606-4767-8626-6d25d84dd5a8', CAST(N'2017-11-20T14:40:24.340' AS DateTime), CAST(N'2017-11-21T15:40:24.340' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (89, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4e1990ed-23ea-4ae1-bbb9-98dc18854917', CAST(N'2017-11-20T14:40:24.340' AS DateTime), CAST(N'2017-11-21T15:40:24.340' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (90, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f5da1c9f-634c-416b-bda3-078a3901e8d6', CAST(N'2017-11-20T14:40:24.407' AS DateTime), CAST(N'2017-11-21T15:40:24.407' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (91, N'cc736f75-4b3f-457b-9110-2272455e282d', N'cbd4706a-fb3d-4c29-b0b4-abf251dfb806', CAST(N'2017-11-20T14:40:24.407' AS DateTime), CAST(N'2017-11-21T15:40:24.407' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (92, N'cc736f75-4b3f-457b-9110-2272455e282d', N'43992129-68e7-43e2-b6c5-0c0ddd960ed8', CAST(N'2017-11-20T14:41:30.700' AS DateTime), CAST(N'2017-11-21T15:41:30.700' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (93, N'cc736f75-4b3f-457b-9110-2272455e282d', N'bf5bc453-e2cf-4163-8d9a-10b708d297aa', CAST(N'2017-11-20T14:41:30.737' AS DateTime), CAST(N'2017-11-21T15:41:30.737' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (94, N'cc736f75-4b3f-457b-9110-2272455e282d', N'53ae6780-308f-493b-b378-92bc82c18b85', CAST(N'2017-11-20T14:41:35.897' AS DateTime), CAST(N'2017-11-21T15:41:35.897' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (95, N'cc736f75-4b3f-457b-9110-2272455e282d', N'2559f993-aa2f-4ce0-a9b6-accde9b3fb7e', CAST(N'2017-11-20T14:41:36.007' AS DateTime), CAST(N'2017-11-21T15:41:36.007' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (96, N'cc736f75-4b3f-457b-9110-2272455e282d', N'8fb5c115-597a-4e8e-af10-a44b56b559ca', CAST(N'2017-11-20T14:41:36.010' AS DateTime), CAST(N'2017-11-21T15:41:36.010' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (97, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f035c5e2-3cf0-45e7-b1ce-42c65b4a6a02', CAST(N'2017-11-20T14:41:36.027' AS DateTime), CAST(N'2017-11-21T15:41:36.027' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (98, N'cc736f75-4b3f-457b-9110-2272455e282d', N'699e1190-344c-43ee-aa57-2dcf4cd020b9', CAST(N'2017-11-20T14:42:46.427' AS DateTime), CAST(N'2017-11-21T15:42:46.427' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (99, N'cc736f75-4b3f-457b-9110-2272455e282d', N'2ea7401f-6119-4de4-89bc-dd2e4cc26aff', CAST(N'2017-11-20T14:42:46.430' AS DateTime), CAST(N'2017-11-21T15:42:46.430' AS DateTime))
GO
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (100, N'cc736f75-4b3f-457b-9110-2272455e282d', N'50847d74-6163-4e33-887c-8041605c06ab', CAST(N'2017-11-20T14:42:51.043' AS DateTime), CAST(N'2017-11-21T15:42:51.043' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (101, N'cc736f75-4b3f-457b-9110-2272455e282d', N'38f83300-6191-4e92-9ba4-61187c366945', CAST(N'2017-11-20T14:42:51.073' AS DateTime), CAST(N'2017-11-21T15:42:51.073' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (102, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5a06bbc1-4fa9-414b-9859-802adf742866', CAST(N'2017-11-20T14:42:51.250' AS DateTime), CAST(N'2017-11-21T15:42:51.250' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (103, N'cc736f75-4b3f-457b-9110-2272455e282d', N'eac037df-b3cf-4a01-be11-f4ea6d13190e', CAST(N'2017-11-20T14:42:51.267' AS DateTime), CAST(N'2017-11-21T15:42:51.267' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (104, N'cc736f75-4b3f-457b-9110-2272455e282d', N'443b01a2-57d4-4257-b084-505a65ee83de', CAST(N'2017-11-20T14:43:31.047' AS DateTime), CAST(N'2017-11-21T15:43:31.047' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (105, N'cc736f75-4b3f-457b-9110-2272455e282d', N'8e98c85b-265f-40d0-a64c-533e538a30c3', CAST(N'2017-11-20T14:43:31.050' AS DateTime), CAST(N'2017-11-21T15:43:31.050' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (106, N'cc736f75-4b3f-457b-9110-2272455e282d', N'1941213f-e473-44bc-bd5d-f332965501ed', CAST(N'2017-11-20T14:43:36.320' AS DateTime), CAST(N'2017-11-21T15:43:36.320' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (107, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f216bdd9-9e14-48a1-98de-81523baeb0b2', CAST(N'2017-11-20T14:43:36.360' AS DateTime), CAST(N'2017-11-21T15:43:36.360' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (108, N'cc736f75-4b3f-457b-9110-2272455e282d', N'cd717eba-3e38-4b61-9ee4-671333e48f61', CAST(N'2017-11-20T14:43:36.477' AS DateTime), CAST(N'2017-11-21T15:43:36.477' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (109, N'cc736f75-4b3f-457b-9110-2272455e282d', N'971e6f87-8569-4444-809a-f197d5cbb103', CAST(N'2017-11-20T14:43:36.477' AS DateTime), CAST(N'2017-11-21T15:43:36.477' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (110, N'cc736f75-4b3f-457b-9110-2272455e282d', N'fb65f96a-fd88-4f21-9c49-7c91fdcbd882', CAST(N'2017-11-20T14:44:13.327' AS DateTime), CAST(N'2017-11-21T15:44:13.327' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (111, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5002bdf6-2413-46a7-b7a5-e557a13afe74', CAST(N'2017-11-20T14:44:13.363' AS DateTime), CAST(N'2017-11-21T15:44:13.363' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (112, N'cc736f75-4b3f-457b-9110-2272455e282d', N'efdc0e55-3c26-4c1e-a77a-c30e6fcca7d3', CAST(N'2017-11-20T14:44:19.693' AS DateTime), CAST(N'2017-11-21T15:44:19.693' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (113, N'cc736f75-4b3f-457b-9110-2272455e282d', N'20a24c4e-ce29-4d11-a089-7757a2582664', CAST(N'2017-11-20T14:44:19.690' AS DateTime), CAST(N'2017-11-21T15:44:19.690' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (114, N'cc736f75-4b3f-457b-9110-2272455e282d', N'91a546e1-e8ca-4e9d-b1d6-3da6590b21d7', CAST(N'2017-11-20T14:44:41.053' AS DateTime), CAST(N'2017-11-21T15:44:41.053' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (115, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ea14ce95-db3b-4693-82a2-68ee07808d46', CAST(N'2017-11-20T14:44:41.050' AS DateTime), CAST(N'2017-11-21T15:44:41.050' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (116, N'cc736f75-4b3f-457b-9110-2272455e282d', N'bf5f46b8-6d07-4bc5-8180-2f902dd354ef', CAST(N'2017-11-20T14:44:53.557' AS DateTime), CAST(N'2017-11-21T15:44:53.557' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (117, N'cc736f75-4b3f-457b-9110-2272455e282d', N'c4dbd076-2599-4b9d-9f4c-869ddd04d2a7', CAST(N'2017-11-20T14:44:53.563' AS DateTime), CAST(N'2017-11-21T15:44:53.563' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (118, N'cc736f75-4b3f-457b-9110-2272455e282d', N'2296515a-2765-4954-940c-d692cd529c1a', CAST(N'2017-11-20T14:45:56.170' AS DateTime), CAST(N'2017-11-21T15:45:56.170' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (119, N'cc736f75-4b3f-457b-9110-2272455e282d', N'df029770-202c-468f-a008-5031966f99d6', CAST(N'2017-11-20T14:47:06.377' AS DateTime), CAST(N'2017-11-21T15:47:06.377' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (120, N'cc736f75-4b3f-457b-9110-2272455e282d', N'47452283-6e09-4e40-b7ff-d7bd01a3ee09', CAST(N'2017-11-20T14:47:16.223' AS DateTime), CAST(N'2017-11-21T15:47:16.223' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (121, N'cc736f75-4b3f-457b-9110-2272455e282d', N'09006cd8-911a-4a03-b55d-1277306e1aad', CAST(N'2017-11-20T14:49:45.167' AS DateTime), CAST(N'2017-11-21T15:49:45.167' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (122, N'cc736f75-4b3f-457b-9110-2272455e282d', N'94176ada-c5e3-48ef-ba3b-2c31601bb92d', CAST(N'2017-11-20T14:49:45.167' AS DateTime), CAST(N'2017-11-21T15:49:45.167' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (123, N'cc736f75-4b3f-457b-9110-2272455e282d', N'467cc327-eea7-47ec-85b6-61eb61cce988', CAST(N'2017-11-20T14:51:53.863' AS DateTime), CAST(N'2017-11-21T15:51:53.863' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (124, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0e404f83-8cd0-4700-ab5a-2e2feff82757', CAST(N'2017-11-20T14:51:53.877' AS DateTime), CAST(N'2017-11-21T15:51:53.877' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (125, N'cc736f75-4b3f-457b-9110-2272455e282d', N'159ed8eb-078f-4cfe-ab9c-d88088b848a4', CAST(N'2017-11-20T14:54:52.073' AS DateTime), CAST(N'2017-11-21T15:54:52.073' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (126, N'cc736f75-4b3f-457b-9110-2272455e282d', N'76946ff6-678f-4d79-a89d-fb9c67dd65d6', CAST(N'2017-11-20T14:54:52.077' AS DateTime), CAST(N'2017-11-21T15:54:52.077' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (127, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f42c149f-8581-405a-be3a-d7c845e34c51', CAST(N'2017-11-20T14:57:27.683' AS DateTime), CAST(N'2017-11-21T15:57:27.683' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (128, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5efe0237-1f4d-48a3-b04a-b3570da497a8', CAST(N'2017-11-20T14:57:27.687' AS DateTime), CAST(N'2017-11-21T15:57:27.687' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (129, N'cc736f75-4b3f-457b-9110-2272455e282d', N'fc7f0845-9055-4676-9e02-99d38051f749', CAST(N'2017-11-20T15:03:06.783' AS DateTime), CAST(N'2017-11-21T16:03:06.783' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (130, N'cc736f75-4b3f-457b-9110-2272455e282d', N'061cd57f-0f96-43df-a1bd-8dbd10049c7b', CAST(N'2017-11-20T15:03:06.787' AS DateTime), CAST(N'2017-11-21T16:03:06.787' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (131, N'cc736f75-4b3f-457b-9110-2272455e282d', N'd39f8b30-70e7-4ed2-ab60-4241a327f252', CAST(N'2017-11-20T15:05:56.447' AS DateTime), CAST(N'2017-11-21T16:05:56.447' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (132, N'cc736f75-4b3f-457b-9110-2272455e282d', N'55e77431-14d6-49ad-b173-8dbdd184fef2', CAST(N'2017-11-20T15:05:56.447' AS DateTime), CAST(N'2017-11-21T16:05:56.447' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (133, N'cc736f75-4b3f-457b-9110-2272455e282d', N'2c08edae-6b81-437b-a89b-e46388dbf9d5', CAST(N'2017-11-20T15:14:05.850' AS DateTime), CAST(N'2017-11-21T16:14:05.850' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (134, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4ec5b1dd-e39c-4e43-92d5-3254c065f9ab', CAST(N'2017-11-20T15:14:05.857' AS DateTime), CAST(N'2017-11-21T16:14:05.857' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (135, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9351f937-c785-4b44-92ab-d992b69c8158', CAST(N'2017-11-20T15:14:11.187' AS DateTime), CAST(N'2017-11-21T16:14:11.187' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (136, N'cc736f75-4b3f-457b-9110-2272455e282d', N'259c9abd-f0b6-4100-a4b2-a7f1e1ff8d51', CAST(N'2017-11-20T15:14:11.210' AS DateTime), CAST(N'2017-11-21T16:14:11.210' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (137, N'cc736f75-4b3f-457b-9110-2272455e282d', N'448d5bc9-8834-4f04-8f0c-39f608adb3f4', CAST(N'2017-11-20T15:14:29.750' AS DateTime), CAST(N'2017-11-21T16:14:29.750' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (138, N'cc736f75-4b3f-457b-9110-2272455e282d', N'57a8c159-1119-4ba8-b345-2659bf8256c0', CAST(N'2017-11-20T15:14:29.753' AS DateTime), CAST(N'2017-11-21T16:14:29.753' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (139, N'cc736f75-4b3f-457b-9110-2272455e282d', N'dcf30c12-6717-4806-ac36-9a04bc585484', CAST(N'2017-11-20T15:15:42.013' AS DateTime), CAST(N'2017-11-21T16:15:42.013' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (140, N'cc736f75-4b3f-457b-9110-2272455e282d', N'968e2d92-3bfb-4e0b-98d2-2a5e90d604dc', CAST(N'2017-11-20T15:15:42.040' AS DateTime), CAST(N'2017-11-21T16:15:42.040' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (141, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4fa0461c-1f25-41a5-b184-5b67f02fd80b', CAST(N'2017-11-20T15:18:31.660' AS DateTime), CAST(N'2017-11-21T16:18:33.373' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (142, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5b3666f2-9a4e-4289-b532-13f2a49b2a30', CAST(N'2017-11-20T15:18:32.507' AS DateTime), CAST(N'2017-11-21T16:18:34.037' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (143, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4d37b062-7c79-4958-a831-5beb861eb1de', CAST(N'2017-11-20T15:29:38.250' AS DateTime), CAST(N'2017-11-21T16:29:38.250' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (144, N'cc736f75-4b3f-457b-9110-2272455e282d', N'bbbfe741-0388-4f4b-817d-069fd79a424b', CAST(N'2017-11-20T15:29:53.680' AS DateTime), CAST(N'2017-11-21T16:29:53.680' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (145, N'cc736f75-4b3f-457b-9110-2272455e282d', N'cf196c58-5b18-4af2-83fb-820c6388bcfa', CAST(N'2017-11-20T15:31:01.310' AS DateTime), CAST(N'2017-11-21T16:31:01.310' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (146, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5a1fd2c9-475f-4e09-a2b8-fa46241ffdc4', CAST(N'2017-11-20T15:35:59.167' AS DateTime), CAST(N'2017-11-21T16:35:59.167' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (147, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ac145f62-8e7c-41f0-a098-f9d5d2b0a8c1', CAST(N'2017-11-20T15:36:12.990' AS DateTime), CAST(N'2017-11-21T16:36:12.990' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (148, N'cc736f75-4b3f-457b-9110-2272455e282d', N'97e80aa6-b15e-45d7-b72d-cb94f7026052', CAST(N'2017-11-20T15:37:16.300' AS DateTime), CAST(N'2017-11-21T16:37:16.300' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (149, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ff8cda8a-7b05-473f-94b1-30eece5667ab', CAST(N'2017-11-20T15:37:57.083' AS DateTime), CAST(N'2017-11-21T16:37:57.083' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (150, N'cc736f75-4b3f-457b-9110-2272455e282d', N'e96e62c5-9169-4d55-8c1f-45576ddc8ae6', CAST(N'2017-11-21T11:59:19.047' AS DateTime), CAST(N'2017-11-22T12:59:19.047' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (151, N'cc736f75-4b3f-457b-9110-2272455e282d', N'015d0f23-1e70-4703-87cb-3a4f33b1da9a', CAST(N'2017-11-21T11:59:57.023' AS DateTime), CAST(N'2017-11-22T12:59:57.023' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (152, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9a3907f8-20fc-44f3-8334-db49676c641e', CAST(N'2017-11-21T12:02:42.913' AS DateTime), CAST(N'2017-11-22T13:02:42.913' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (153, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4206a1a0-bb63-4d78-bf4e-f02e82f3860b', CAST(N'2017-11-21T12:13:31.613' AS DateTime), CAST(N'2017-11-22T13:13:31.613' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (154, N'cc736f75-4b3f-457b-9110-2272455e282d', N'8a8b0ae4-62c0-4324-97dd-0e875d6f430d', CAST(N'2017-11-21T12:13:31.703' AS DateTime), CAST(N'2017-11-22T13:13:31.703' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (155, N'cc736f75-4b3f-457b-9110-2272455e282d', N'94852391-28c2-41bf-8e6a-4298cfcbc5ec', CAST(N'2017-11-21T12:13:54.703' AS DateTime), CAST(N'2017-11-22T13:13:54.703' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (156, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5645fe50-6d45-4026-aa35-153f072abe5b', CAST(N'2017-11-21T12:13:59.277' AS DateTime), CAST(N'2017-11-22T13:13:59.277' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (157, N'cc736f75-4b3f-457b-9110-2272455e282d', N'1bf5465a-4268-4a2f-ad77-320dcfbc709d', CAST(N'2017-11-21T12:15:18.913' AS DateTime), CAST(N'2017-11-22T13:15:18.913' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (158, N'cc736f75-4b3f-457b-9110-2272455e282d', N'a103746b-a22f-43e7-a528-7094400c2b65', CAST(N'2017-11-21T12:16:01.927' AS DateTime), CAST(N'2017-11-22T13:16:01.927' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (159, N'cc736f75-4b3f-457b-9110-2272455e282d', N'771efb3f-de72-481b-a8fc-cf9ef280601d', CAST(N'2017-11-21T12:22:37.487' AS DateTime), CAST(N'2017-11-22T13:22:37.487' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (160, N'cc736f75-4b3f-457b-9110-2272455e282d', N'46c1dc66-d31c-4c63-a3db-285c29bf70de', CAST(N'2017-11-21T12:24:18.517' AS DateTime), CAST(N'2017-11-22T13:24:18.517' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (161, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f5e93eb2-2a61-4357-8514-d366f537b0d0', CAST(N'2017-11-21T12:30:04.427' AS DateTime), CAST(N'2017-11-22T13:30:04.427' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (162, N'cc736f75-4b3f-457b-9110-2272455e282d', N'79e6c694-03d2-4748-9799-27ed5a272c20', CAST(N'2017-11-21T12:30:08.317' AS DateTime), CAST(N'2017-11-22T13:30:08.317' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (163, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ff16cb37-89e4-4870-a394-f05d0c58beeb', CAST(N'2017-11-21T12:30:09.300' AS DateTime), CAST(N'2017-11-22T13:30:09.300' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (164, N'cc736f75-4b3f-457b-9110-2272455e282d', N'63aa4af0-e504-44e6-a5e5-d829975d8ba1', CAST(N'2017-11-21T12:30:10.073' AS DateTime), CAST(N'2017-11-22T13:30:10.073' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (165, N'cc736f75-4b3f-457b-9110-2272455e282d', N'86b892f3-89eb-4d60-8f5c-96e9cb7efb98', CAST(N'2017-11-21T12:30:10.637' AS DateTime), CAST(N'2017-11-22T13:30:10.637' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (166, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9ec2b6f9-6a76-4309-b452-59198b01f176', CAST(N'2017-11-21T12:30:10.813' AS DateTime), CAST(N'2017-11-22T13:30:10.813' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (167, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b6ebcd2e-4116-4d30-9bd6-99d243879180', CAST(N'2017-11-21T12:53:37.740' AS DateTime), CAST(N'2017-11-22T13:53:37.740' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (168, N'cc736f75-4b3f-457b-9110-2272455e282d', N'56b155c4-878e-4de6-826e-5d141e5ef9be', CAST(N'2017-11-21T12:54:16.230' AS DateTime), CAST(N'2017-11-22T13:54:16.230' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (169, N'cc736f75-4b3f-457b-9110-2272455e282d', N'75c0cdeb-f578-4a1c-b11c-a057924cce4f', CAST(N'2017-11-21T12:56:10.313' AS DateTime), CAST(N'2017-11-22T13:56:10.313' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (170, N'cc736f75-4b3f-457b-9110-2272455e282d', N'76264138-339c-46ab-adc0-a4419354e172', CAST(N'2017-11-21T12:56:21.460' AS DateTime), CAST(N'2017-11-22T13:56:21.460' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (171, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9bcc73f9-6e6d-4bbc-8884-0028012f39a0', CAST(N'2017-11-21T12:59:07.067' AS DateTime), CAST(N'2017-11-22T13:59:07.067' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (172, N'cc736f75-4b3f-457b-9110-2272455e282d', N'94bbc94d-7aa7-4444-8d84-7f805c0d2165', CAST(N'2017-11-21T12:59:17.057' AS DateTime), CAST(N'2017-11-22T13:59:17.057' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (173, N'cc736f75-4b3f-457b-9110-2272455e282d', N'7466165b-2c80-4f74-9ede-a907b90e1f5b', CAST(N'2017-11-21T12:59:39.643' AS DateTime), CAST(N'2017-11-22T13:59:39.643' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (174, N'cc736f75-4b3f-457b-9110-2272455e282d', N'16adfb80-c6e7-4128-a0cc-b881c87f58c6', CAST(N'2017-11-21T13:00:40.483' AS DateTime), CAST(N'2017-11-22T14:00:40.483' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (175, N'cc736f75-4b3f-457b-9110-2272455e282d', N'e139e409-82bb-4272-8405-7033c2eb74f0', CAST(N'2017-11-21T14:15:02.853' AS DateTime), CAST(N'2017-11-22T15:15:02.853' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (176, N'cc736f75-4b3f-457b-9110-2272455e282d', N'55989c79-4e70-4cf3-98c6-c78e162be5f9', CAST(N'2017-11-21T14:15:22.680' AS DateTime), CAST(N'2017-11-22T15:15:22.680' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (177, N'cc736f75-4b3f-457b-9110-2272455e282d', N'e06ee91f-cc7e-46d3-b73d-1a2279f8e8fe', CAST(N'2017-11-21T14:22:51.253' AS DateTime), CAST(N'2017-11-22T15:22:51.253' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (178, N'cc736f75-4b3f-457b-9110-2272455e282d', N'935befa6-d8d8-415b-a97d-f8cbfa70e1b7', CAST(N'2017-11-21T14:24:06.560' AS DateTime), CAST(N'2017-11-22T15:24:06.560' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (179, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0620b885-f3e1-47c8-8e4d-fa20dc6408be', CAST(N'2017-11-21T14:35:30.460' AS DateTime), CAST(N'2017-11-22T15:35:30.460' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (180, N'cc736f75-4b3f-457b-9110-2272455e282d', N'c98329f2-7d3b-46e5-a49c-315e63e9315f', CAST(N'2017-11-21T14:38:21.817' AS DateTime), CAST(N'2017-11-22T15:38:21.817' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (181, N'cc736f75-4b3f-457b-9110-2272455e282d', N'cacade6e-ae7e-45d1-b801-fe6bc6d95ca6', CAST(N'2017-11-21T14:38:32.620' AS DateTime), CAST(N'2017-11-22T15:38:32.620' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (182, N'cc736f75-4b3f-457b-9110-2272455e282d', N'316a68b8-9be2-4d1b-84dd-1778d99112c7', CAST(N'2017-11-21T14:40:49.927' AS DateTime), CAST(N'2017-11-22T15:40:49.927' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (183, N'cc736f75-4b3f-457b-9110-2272455e282d', N'85729c0c-1080-4eec-b319-3068ef6a374a', CAST(N'2017-11-21T14:43:04.450' AS DateTime), CAST(N'2017-11-22T15:43:04.450' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (184, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b2d62489-7041-4bb7-833c-225c37dd11f3', CAST(N'2017-11-21T14:44:17.877' AS DateTime), CAST(N'2017-11-22T15:44:17.877' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (185, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4bcfb4d3-c3fb-4860-8e83-90996f19b87a', CAST(N'2017-11-21T14:45:37.697' AS DateTime), CAST(N'2017-11-22T15:45:37.697' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (186, N'cc736f75-4b3f-457b-9110-2272455e282d', N'9b395abc-951e-4790-8343-4661623aacf5', CAST(N'2017-11-21T14:48:22.617' AS DateTime), CAST(N'2017-11-22T15:48:22.617' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (187, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0c6bed28-337d-40fd-af87-e24eac422de6', CAST(N'2017-11-21T14:49:39.727' AS DateTime), CAST(N'2017-11-22T15:49:39.727' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (188, N'cc736f75-4b3f-457b-9110-2272455e282d', N'a04b9876-9541-4fe9-abe8-849782bc56d1', CAST(N'2017-11-21T14:50:02.900' AS DateTime), CAST(N'2017-11-22T15:50:02.900' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (189, N'cc736f75-4b3f-457b-9110-2272455e282d', N'62ac7b02-53fe-458b-935f-c48c365d6a2f', CAST(N'2017-11-21T15:07:32.620' AS DateTime), CAST(N'2017-11-22T16:07:32.620' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (190, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0b67dff2-1494-475d-a0e8-e41e5d894752', CAST(N'2017-11-21T15:14:18.487' AS DateTime), CAST(N'2017-11-22T16:14:18.487' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (191, N'cc736f75-4b3f-457b-9110-2272455e282d', N'fe57fe95-9bae-44f1-a71d-25fd9eedd393', CAST(N'2017-11-21T15:15:15.947' AS DateTime), CAST(N'2017-11-22T16:15:15.947' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (192, N'cc736f75-4b3f-457b-9110-2272455e282d', N'266effd3-8778-43ed-8938-2167a637c505', CAST(N'2017-11-21T15:17:27.340' AS DateTime), CAST(N'2017-11-22T16:17:27.340' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (193, N'cc736f75-4b3f-457b-9110-2272455e282d', N'26603735-cf57-4bb4-be97-9a77b29cbb2c', CAST(N'2017-11-23T13:40:17.500' AS DateTime), CAST(N'2017-11-24T14:40:17.500' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (194, N'cc736f75-4b3f-457b-9110-2272455e282d', N'24098a71-573a-495d-a536-694c3cf2aee5', CAST(N'2017-11-23T13:41:47.793' AS DateTime), CAST(N'2017-11-24T14:41:47.793' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (195, N'cc736f75-4b3f-457b-9110-2272455e282d', N'37a63eda-7207-40f9-a8b4-ca794fe8e69b', CAST(N'2017-11-23T13:49:05.127' AS DateTime), CAST(N'2017-11-24T14:49:05.127' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (196, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b73ec8ea-376c-4a8c-a4f3-553fe929c8c6', CAST(N'2017-11-23T13:49:30.797' AS DateTime), CAST(N'2017-11-24T14:49:30.797' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (197, N'cc736f75-4b3f-457b-9110-2272455e282d', N'b70a01fe-6990-4f0d-aef8-f1eace587852', CAST(N'2017-11-23T13:50:28.373' AS DateTime), CAST(N'2017-11-24T14:50:28.373' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (198, N'cc736f75-4b3f-457b-9110-2272455e282d', N'53144563-1666-476a-b6a6-edb59b4f9d16', CAST(N'2017-11-23T13:53:05.557' AS DateTime), CAST(N'2017-11-24T14:53:05.557' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (199, N'cc736f75-4b3f-457b-9110-2272455e282d', N'a47aea64-b003-472b-a1d6-2d641bcae05e', CAST(N'2017-11-23T13:53:40.430' AS DateTime), CAST(N'2017-11-24T14:53:40.430' AS DateTime))
GO
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (200, N'cc736f75-4b3f-457b-9110-2272455e282d', N'8124e602-6ccd-4dce-9069-e1a97e0d80f2', CAST(N'2017-11-23T13:54:13.090' AS DateTime), CAST(N'2017-11-24T14:54:13.090' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (201, N'cc736f75-4b3f-457b-9110-2272455e282d', N'c0e8d861-7643-46a2-8685-b1fde80d72c4', CAST(N'2017-11-23T13:56:30.763' AS DateTime), CAST(N'2017-11-24T14:56:30.763' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (202, N'cc736f75-4b3f-457b-9110-2272455e282d', N'c8dfe6f6-440c-46df-ad2b-88772c7ce14f', CAST(N'2017-11-23T13:59:01.213' AS DateTime), CAST(N'2017-11-24T14:59:01.213' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (203, N'cc736f75-4b3f-457b-9110-2272455e282d', N'358df9db-f2d0-4c2b-9973-1e27d354cb6f', CAST(N'2017-11-24T10:37:02.857' AS DateTime), CAST(N'2017-11-25T11:37:02.857' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (204, N'cc736f75-4b3f-457b-9110-2272455e282d', N'6cf91039-64bb-4e67-b220-a0772f38e5e9', CAST(N'2017-11-24T11:19:41.373' AS DateTime), CAST(N'2017-11-25T12:19:41.373' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (205, N'cc736f75-4b3f-457b-9110-2272455e282d', N'5118b84d-75e4-4f35-8fb6-5e7a374ac6d6', CAST(N'2017-11-25T11:52:58.623' AS DateTime), CAST(N'2017-11-26T12:52:58.623' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (206, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4be8b01e-1492-426c-b635-910e07fd1a65', CAST(N'2017-11-25T11:55:45.673' AS DateTime), CAST(N'2017-11-26T12:55:45.673' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (207, N'cc736f75-4b3f-457b-9110-2272455e282d', N'ba01e987-26ff-48ce-9ee6-692cccc1ce9c', CAST(N'2017-11-25T11:56:35.070' AS DateTime), CAST(N'2017-11-26T12:56:35.070' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (208, N'cc736f75-4b3f-457b-9110-2272455e282d', N'1075e8bf-25a2-484c-917c-743ef02c8999', CAST(N'2017-11-25T11:57:34.807' AS DateTime), CAST(N'2017-11-26T12:57:34.807' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (209, N'cc736f75-4b3f-457b-9110-2272455e282d', N'0750f101-8189-47a9-a7c9-94588431b6d8', CAST(N'2017-11-25T14:15:01.740' AS DateTime), CAST(N'2017-11-26T15:15:01.740' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (210, N'cc736f75-4b3f-457b-9110-2272455e282d', N'e4485c99-0e9a-4ab2-9172-a66b22af77e5', CAST(N'2017-11-28T10:02:51.617' AS DateTime), CAST(N'2017-11-29T11:02:51.617' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (211, N'1170d911-3f0f-4360-875a-4b83fe765bdd', N'363960bf-10fd-44ca-9651-bf9f89fc9032', CAST(N'2017-12-09T12:52:09.740' AS DateTime), CAST(N'2017-12-10T13:52:09.740' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (212, N'738c30fa-6694-43d7-8dcb-93b12eb592c9', N'e664ecbc-1eee-484f-b7c9-fa8050a73e3c', CAST(N'2017-12-09T13:03:45.697' AS DateTime), CAST(N'2017-12-10T14:03:45.697' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (213, N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', N'6864141f-b77c-44b6-b21b-5eed2447973c', CAST(N'2017-12-09T14:29:47.207' AS DateTime), CAST(N'2017-12-10T15:29:47.207' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (214, N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', N'085b88b3-0601-4c1e-9646-78ceb2326850', CAST(N'2017-12-09T15:02:15.110' AS DateTime), CAST(N'2017-12-10T16:02:15.110' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (215, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4e28b664-0b49-42c6-bf69-7083c8c08d72', CAST(N'2017-12-12T12:32:12.343' AS DateTime), CAST(N'2017-12-13T13:32:12.343' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (216, N'cc736f75-4b3f-457b-9110-2272455e282d', N'94fa1b39-bda6-4ce8-9d02-293a0a13db64', CAST(N'2017-12-23T12:39:02.397' AS DateTime), CAST(N'2017-12-24T13:39:02.397' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (217, N'7fd023e7-b320-484f-b6d8-593dfa49571d', N'9a7b7c3d-5fe3-4670-b310-76e3a686ee53', CAST(N'2017-12-26T14:49:45.947' AS DateTime), CAST(N'2017-12-27T15:49:45.947' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (218, N'4c304d4b-4265-4c38-b10a-91e74b525453', N'0ece304d-0089-4e0d-b115-6514199721d5', CAST(N'2017-12-26T15:04:11.070' AS DateTime), CAST(N'2017-12-27T16:04:11.070' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (219, N'8d6ab7f0-2245-4e7a-b0a0-54e8a11db265', N'a8171f57-e1d1-4eaa-a92b-f0f6c8a3c152', CAST(N'2017-12-26T15:29:19.120' AS DateTime), CAST(N'2017-12-27T16:29:19.120' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (220, N'cc736f75-4b3f-457b-9110-2272455e282d', N'63b891f0-c43d-417f-92e7-41237710bfb9', CAST(N'2017-12-26T15:32:49.670' AS DateTime), CAST(N'2017-12-27T16:32:49.670' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (221, N'4c304d4b-4265-4c38-b10a-91e74b525453', N'd297dc38-fcb0-4c45-a712-deec8bbaff3a', CAST(N'2017-12-26T15:51:36.687' AS DateTime), CAST(N'2017-12-27T16:51:36.687' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (222, N'cc736f75-4b3f-457b-9110-2272455e282d', N'4bca54da-b342-492b-a0a2-0ebf0a17038f', CAST(N'2017-12-27T14:20:22.813' AS DateTime), CAST(N'2017-12-28T15:20:22.813' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (223, N'cc736f75-4b3f-457b-9110-2272455e282d', N'59e44d0c-7c1c-464a-922b-2f2260b11788', CAST(N'2018-01-05T09:10:09.570' AS DateTime), CAST(N'2018-01-06T10:10:09.570' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (224, N'cc736f75-4b3f-457b-9110-2272455e282d', N'f23c7898-d3fd-455e-a16f-a7f2b9aa4a0f', CAST(N'2018-01-05T09:10:09.570' AS DateTime), CAST(N'2018-01-06T10:10:09.570' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (225, N'cc736f75-4b3f-457b-9110-2272455e282d', N'a3c1fdce-888e-4a12-99bb-6c381eedcf09', CAST(N'2018-01-05T09:10:10.087' AS DateTime), CAST(N'2018-01-06T10:10:10.087' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (226, N'cc736f75-4b3f-457b-9110-2272455e282d', N'616055d7-4fce-4bcd-a9d6-94b019c4dc56', CAST(N'2018-01-05T09:10:55.807' AS DateTime), CAST(N'2018-01-06T10:10:55.807' AS DateTime))
INSERT [dbo].[Tokens] ([Id], [UserId], [AuthToken], [IssuedOn], [ExpiresOn]) VALUES (227, N'cc736f75-4b3f-457b-9110-2272455e282d', N'3fb65f92-249b-4eb0-988c-8422b251b4fb', CAST(N'2018-01-05T09:16:40.357' AS DateTime), CAST(N'2018-01-06T10:16:40.357' AS DateTime))
SET IDENTITY_INSERT [dbo].[Tokens] OFF
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'b1469bb7-6094-4725-8ee0-1ce9f0c0b9a0', N'19892089-46b2-4162-8c17-279f3cb7b02a', N'42b80bb8-2260-4720-a1ef-6d49f1b26df2')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'6544b304-1a3e-4ee3-8060-218b6f688d17', N'1669bbc7-1b6d-4f6b-bbc0-048e56465699', N'd1ffcb66-bdf6-420d-8c14-c25e5b937c2e')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'a6d5fcee-94ce-4a65-9af2-28e2f7aae5e2', N'85bd14ee-bdcc-464b-b430-f403c59e8ad9', N'69091d97-b973-4086-ae3b-74f660fa8307')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'a83491ed-12a1-40ea-a1ac-2e2014f7ff1a', N'29521f16-8458-4292-b440-8dbc5f34787c', N'59e15351-75ba-4745-b1ea-ff39f2cbc1d3')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'c9e3ebc1-c67c-4d1e-ac80-324904dc45fe', N'76cf2742-a9aa-4af8-ab3d-95310a8a7c21', N'6f065ea1-9a86-49d1-9427-6ff917871fdd')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'65a18ae7-7730-42ce-abf1-35bc777070e9', N'b1c78bed-834a-4ffd-b74f-ef04e3ea51ae', N'5c4f3b9a-1b2a-4cbd-b851-5b1b834b2215')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'bb829aeb-8751-41a5-b430-39f822f5a7fe', N'cc736f75-4b3f-457b-9110-2272455e282d', N'28b6ebce-7b8f-472f-9bca-425bbdcedf25')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'cac546b7-c16f-4415-899a-5439907ccfc8', N'b59f4110-239c-4005-b10c-2f410996ec5d', N'afd2b192-cb67-49a2-90fa-471fa51f4d5c')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'2b8ff26b-8483-4b19-99e2-65aa63eef423', N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', N'5c9945a6-7d2e-4d44-9a1b-73c68cb99de6')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'3b5c2d65-e3e7-453a-92e2-847e3562362d', N'cc736f75-4b3f-457b-9110-2272455e282d', N'f1347121-01f1-4a75-9ed0-d11a3041df96')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'001683ea-795d-4778-ba82-876483ef72c5', N'cc736f75-4b3f-457b-9110-2272455e282d', N'2186a509-9b1e-48d1-99cf-affe3ce4f03b')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'4c870ca3-9d6b-4bad-8616-8c3c2b22de25', N'a610d993-0954-4f5f-a5b1-b61fd07dbd39', N'6a80b774-d467-4036-a714-e45b1cd42608')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'9e636a80-8498-4c6c-873f-a3388f68b013', N'cc736f75-4b3f-457b-9110-2272455e282d', N'dd12e932-5964-4113-b6af-78b94f1619c5')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'4b7e3b67-6cd4-41f3-b666-b62e58e676f3', N'59835b2c-bb91-4f70-9b52-d9794b188982', N'344aee25-8c96-412b-b124-c96fa551bf79')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'd3200c6a-1d70-48dd-bfbb-c1c64d5e910d', N'cc736f75-4b3f-457b-9110-2272455e282d', N'2fc25ff9-16c5-4be7-a67a-ae815e3d8e56')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'e5cd9691-cc6d-4f16-87d6-c3e5f2a50f03', N'cc736f75-4b3f-457b-9110-2272455e282d', N'665db2d3-2a6a-4bca-a7ca-8a9a6d621175')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'3b8dbd29-b087-447d-990b-c44eb11da523', N'a0207895-29f3-4fcf-a80e-ec3337b7cdce', N'f5e62f89-553b-4ac9-988c-4282743b2598')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'd393ad0a-b55f-4c8f-b6be-e0abecae60a0', N'52da82fd-f624-4260-8617-00759c715d08', N'b0d875db-7e31-4aa1-bd23-783e8ef8d25a')
INSERT [dbo].[UserImages] ([Id], [UserId], [ImageId]) VALUES (N'8ae5b0bd-2f4a-4f53-aac8-f3c30cd5c74e', N'2c89c409-28e1-4b81-acb7-9beb5a7349db', N'42b80bb8-2260-4720-a1ef-6d49f1b26df2')
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'52da82fd-f624-4260-8617-00759c715d08', N'Phan Văn', N'Thi', 1, N'thiphan@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'1669bbc7-1b6d-4f6b-bbc0-048e56465699', N'Nguyễn Trần', N'Thương Ngọc', 0, N'thuongngoc@gmail.com', N'6677', CAST(N'1997-08-28' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'17a5405b-f91f-45a3-81e3-17e27fe38fc9', N'Test', N'Login', 1, N'testLogin@gmail.com', N'test', CAST(N'2017-12-10' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'cc736f75-4b3f-457b-9110-2272455e282d', N'Hoài1', N'Linh Tinh1', 1, N'hoailinhtinh@gmail.com', N'8899', CAST(N'1993-06-03' AS Date), 0, 1)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'3f1b2404-22c1-48a5-804e-25b33e2f8e92', N'Tuan', N'Pham', 0, N'testLogin2@gmail.com', N'1234', CAST(N'2017-12-01' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'19892089-46b2-4162-8c17-279f3cb7b02a', N'Nguyễn Thị ', N'Phượng', 0, N'phuong@gmail.com', N'1234', CAST(N'1990-03-28' AS Date), 1, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'b59f4110-239c-4005-b10c-2f410996ec5d', N'Nguyễn Văn', N'An', 1, N'annguyen@gmail.com', N'ahihi', CAST(N'1990-05-28' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'0d8ab4be-19c3-4f68-8495-4155b43a8018', N'Test4', N'Test4', 1, N'thiphan1111@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'8d165d84-2507-430e-b28c-429b0d532aac', N'Testttt', N'Testttt', 1, N'thiphan1111@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'1170d911-3f0f-4360-875a-4b83fe765bdd', N'Test1', N'Login1', 1, N'testLogin1@gmail.com', N'test', CAST(N'2017-12-04' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'8d6ab7f0-2245-4e7a-b0a0-54e8a11db265', N'Tuan', N'Pham', 1, N'testGender2@gmail.com', N'tuan', CAST(N'2017-12-03' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'fa3735f6-4631-4230-bc99-554d0d283510', N'Pham', N'Tuan', 1, N'tuanbk08vn@gmail.com', N'1234', CAST(N'2017-12-21' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'7fd023e7-b320-484f-b6d8-593dfa49571d', N'Pham', N'Tuan', 1, N'tuanbk08vn1@gmail.com', N'tuan', CAST(N'2017-12-03' AS Date), 0, 1)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'60ae2203-237f-4811-8e06-6aa369e71bae', N'Tuan', N'Pham', 1, N'testLogin4@gmail.com', N'1234', CAST(N'2017-12-01' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'eadff00a-2d22-46b1-b351-7a22c7cd69df', N'Test2', N'Test2', 1, N'thiphan1111@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'4b0ee594-0f31-4b6a-a110-856b8bece802', N'Test Post', N'Test Post', 1, N'TestPost@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'29521f16-8458-4292-b440-8dbc5f34787c', N'Dư', N'Thế Long', 1, N'thelong@gmail.com', N'4455', CAST(N'1996-06-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'2b7f64ce-0321-403b-a5d7-911a85bdee49', N'Test7', N'Thdddi', 1, N'thiggghpdh5an@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'4c304d4b-4265-4c38-b10a-91e74b525453', N'Tuan', N'Pham', 1, N'testGender@gmail.com', N'tuan', CAST(N'2017-03-06' AS Date), 0, 1)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'738c30fa-6694-43d7-8dcb-93b12eb592c9', N'Tuan', N'Pham', 1, N'testLogin7@gmail.com', N'1234', CAST(N'2017-12-16' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'76cf2742-a9aa-4af8-ab3d-95310a8a7c21', N'Nguyễn Văn', N'Tào', 1, N'ualala@gmail.com', N'1123', CAST(N'1992-05-25' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'2c89c409-28e1-4b81-acb7-9beb5a7349db', N'Pham Văn', N'Thành', 1, N'thanhpham@gmail.com', N'565767', CAST(N'1991-03-29' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'f0aaa990-6b93-4559-a321-9f5732cce200', N'Test3', N'Test3', 1, N'thiphan1111@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'4337503f-a930-4b05-bb86-aabcda6fd907', N'Test Post', N'Test Post', 1, N'TestPost1@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'a610d993-0954-4f5f-a5b1-b61fd07dbd39', N'Nguyễn Thùy', N'Dung', 0, N'thuydung@gmail.com', N'1289', CAST(N'1997-07-26' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'a37a6441-d56d-4f61-ac9e-cc1fbe32b00c', N'Tuan', N'Pham', 1, N'testLogin5@gmail.com', N'1234', CAST(N'2017-12-03' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'3312cb36-b5b5-4c04-95f4-ccb5d7d1be25', N'Phạm Quốc ', N'Tuấn', 1, N'quoctuan@gmail.com', N'1234', CAST(N'1990-10-26' AS Date), 1, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'f5548421-f1bd-4ce2-b056-d24a4bdbeb1f', N'Test', N'Login3', 1, N'testLogin3@gmail.com', N'123', CAST(N'2017-12-08' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'59835b2c-bb91-4f70-9b52-d9794b188982', N'Trần', N'Sáu', 1, N'saubanh@gmail.com', N'taolao', CAST(N'1986-06-02' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'0b5715ff-1774-458f-8bb2-dee33cbec16d', N'Test1', N'Test1', 1, N'thiphan1111@gmail.com', N'bleu', CAST(N'1996-05-20' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'399130af-a304-4791-a933-e8b41c629fe4', N'Tuan', N'Pham', 0, N'testLogin6@gmail.com', N'1234', CAST(N'2017-12-02' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'b23e1fae-5bd6-4b1d-854d-e9dd47997e98', N'Tuan', N'Pham', 1, N'testLogin8@gmail.com', N'1234', CAST(N'2017-12-16' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'a0207895-29f3-4fcf-a80e-ec3337b7cdce', N'Trần', N'Khả Vân', 0, N'khavan@gmail.com', N'khavan', CAST(N'1994-05-02' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'b1c78bed-834a-4ffd-b74f-ef04e3ea51ae', N'Dư', N'Thanh Thành', 0, N'thanhthanh@gmail.com', N'2234', CAST(N'1992-02-22' AS Date), 0, NULL)
INSERT [dbo].[Users] ([Id], [LastName], [FirstName], [Gender], [Email], [Password], [Birthday], [IsAdmin], [HasStore]) VALUES (N'85bd14ee-bdcc-464b-b430-f403c59e8ad9', N'Nguyễn Thùy', N'Thảo', 0, N'thaonguyen@gmail.com', N'!pass', CAST(N'1987-07-26' AS Date), 0, NULL)
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
ALTER DATABASE [iFoody] SET  READ_WRITE 
GO
