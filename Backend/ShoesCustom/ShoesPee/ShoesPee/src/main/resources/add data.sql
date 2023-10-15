
drop database shoepee;
create database shoepee;
use shoepee;


create table tblbrand(
                         brandId int primary key auto_increment,
                         brandName nvarchar(255),
                         imageUrl varchar(1000)
);


create table tblshoplocation(
                                locationId int primary key auto_increment,
                                locationName nvarchar(255),
                                address nvarchar(255),
                                phone varchar(50),
                                email varchar(255),
                                workingHour time
);



create table tbluser(
                        userId int primary key auto_increment,
                        userName nvarchar(100),
                        password varchar(100),
                        email varchar(255),
                        address varchar(1000),
                        phone varchar(50),
                        roleName varchar(50)
);

create table tblorder(
                         orderId int primary key auto_increment,
                         userId int,
                         orderDate varchar(255),
                         status bit,
                         locationId int,
                         totalPrice decimal(10,2),
                         foreign key(userId) references tbluser(userId),
                         foreign key(locationId) references tblshoplocation(locationId)
);



create table tblorderdetail(
                               orderDetailId int primary key auto_increment,
                               orderId int,
                               quantity int,
                               unitPrice decimal(10,2),
                               subtotal decimal(10,2),
                               foreign key(orderId) references tblorder(orderId)
);


create table tblservice(
                           serviceId int primary key auto_increment,
                           name nvarchar(100),
                           description nvarchar(1000),
                           price decimal(10,2)
);


create table tblshoemodel(
                             modelId int primary key auto_increment,
                             brandId int,
                             modelName nvarchar(255),
                             imageurl varchar(1000),
                             foreign key(brandId) references tblbrand(brandId)
);


create table tblshoe(
                        shoeId int primary key auto_increment,
                        brandId int,
                        modelId int,
                        size int,
                        price decimal(10,2),
                        description nvarchar(1000),
                        imageUrl varchar(1000),
                        orderId int,
                        foreign key(orderId) references tblorder(orderId),
                        foreign key(modelId) references tblshoemodel(modelId)
);


create table tblservicemodel(
                                serviceModelId int primary key auto_increment,
                                serviceId int,
                                modelId int,
                                price decimal(10,2),
                                orderDetailId int,
                                imageModel varchar(1000),
                                foreign key(orderDetailId) references tblorderdetail(orderDetailId),
                                foreign key(serviceId) references tblservice(serviceId),
                                foreign key(modelId) references tblshoemodel(modelId)
);


create table tbluserdrawing(
                               id int primary key auto_increment,
                               userId int,
                               drawingFile varchar(1000),
                               description nvarchar(1000),
                               orderDetailId int,
                               foreign key(userId) references tbluser(userId),
                               foreign key(orderDetailId) references tblorderdetail(orderDetailId)
);


create table tblpayment(
                           paymentId int primary key auto_increment,
                           orderId int,
                           amount int,
                           paymentDate datetime,
                           method varchar(255),
                           status varchar(255),
                           foreign key(orderId) references tblorder(orderId)
);


INSERT INTO tblbrand (brandName,imageUrl) VALUES ('ADIDAS','https://cdn.britannica.com/94/193794-050-0FB7060D/Adidas-logo.jpg');
INSERT INTO tblbrand (brandName,imageUrl) VALUES ('NIKE','https://www.google.com/url?sa=i&url=http%3A%2F%2Fenvironment.balochistan.gov.pk%2F%3Fu%3Dnike-stores-in-mm-GdBylZia&psig=AOvVaw35crLiOunZ56csoHk_6Qyu&ust=1697371734257000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPDup8zA9YEDFQAAAAAdAAAAABAJ');
INSERT INTO tblshoplocation (locationName,address,phone,email,workingHour) VALUES ('thu duc','le van viet','0987654321','shop1@gmail.com','9:00');
INSERT INTO tblshoplocation (locationName,address,phone,email,workingHour) VALUES ('go vap','phan van tri','0787654321','shop2@gmail.com','9:00');
INSERT INTO tbluser (userName,password,email,address,phone,roleName) VALUES ('minhchan','1','minh123@gmail.com','S702 vin','0123456789','ADMIN');
INSERT INTO tbluser (userName,password,email,address,phone,roleName) VALUES ('anxem','2','an123@gmail.com','le van viet','0123456780','USER');
INSERT INTO tblorder (userId,orderDate,status,locationId,totalPrice) VALUES (2,'10/7/2023',1,2,'1000');
INSERT INTO tblorder (userId,orderDate,status,locationId,totalPrice) VALUES (2,'9/16/2023',1,2,'400');
INSERT INTO tblorderdetail (orderId,quantity,unitPrice,subtotal) VALUES (1,4,'200','1500');
INSERT INTO tblorderdetail (orderId,quantity,unitPrice,subtotal) VALUES (2,4,'300','1300');
INSERT INTO tblservice (name,description,price) VALUES ('custom','stickers,','25');
INSERT INTO tblshoemodel (brandId,modelName,imageurl) VALUES (1,'UltraBoost','https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4f225a0bbc3e43729858af0100006731_9366/Giay_Ultraboost_1.0_trang_HQ4207_01_standard.jpg');
INSERT INTO tblshoemodel (brandId,modelName,imageurl) VALUES (2,'Air Force 1','https://sneakerholicvietnam.vn/wp-content/uploads/2021/07/nike-air-force-1-low-white-315115-112.jpg');
INSERT INTO tblshoe (brandId,modelId,size,price,description,imageUrl,orderId)
VALUES (1,1,42,'99','A shoe has flexible','https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4f225a0bbc3e43729858af0100006731_9366/Giay_Ultraboost_1.0_trang_HQ4207_01_standard.jpg',1);
INSERT INTO tblservicemodel (serviceId,modelId,price,orderDetailId)
VALUES (1,1,'15',2);
INSERT INTO tbluserdrawing (userId,drawingFile,description,orderDetailId)
VALUES (1,'good','best of store',1);
INSERT INTO tblpayment (orderId,amount,paymentDate,method,status)
VALUES (1,1,'2022-10-10','paint','done');
select * from tbluser	