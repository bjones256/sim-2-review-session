-- create table products(
-- id serial primary key,
-- name text,
-- price real,
-- description text
-- );

-- insert into products(name, price, description)
-- values ('Shoes', 14.99, 'These are shoes!'), 
-- ('Pants', 24.99, e'Who doesn\'t like pants?'),
-- ('A Bunch of chickens', 143.99, 'Name explains it all'),
-- ('A thimble of water', 75.00, 'Gotta stay hydrated'),
-- ('Where the Wild Things Are', 3.99, 'Such a good book, right?');

-- create table cart(
-- product_id integer references products(id),
-- quantity integer
-- )
