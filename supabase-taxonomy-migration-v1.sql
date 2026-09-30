-- Buy From Iran canonical taxonomy migration v1
-- Safe reset: only runs when no products or product ranges exist.

do $$
begin
  if exists (select 1 from public.products limit 1) then
    raise exception 'Migration stopped: products table is not empty.';
  end if;
  if exists (select 1 from public.product_ranges limit 1) then
    raise exception 'Migration stopped: product_ranges table is not empty.';
  end if;
end $$;

delete from public.categories;

with roots(name,slug,sort_order) as (
  values
  ('Agriculture & Food','agriculture-food',10),
  ('Beverage','beverage',20),
  ('Personal Care','personal-care',30),
  ('Home Care','home-care',40),
  ('Textile & Apparel','textile-apparel',50)
)
insert into public.categories(name,slug,sort_order)
select name,slug,sort_order from roots;

with c as (
  select id, slug from public.categories where parent_id is null
),
subs(parent_slug,name,slug,code_prefix,sort_order) as (
  values
  ('agriculture-food','Biscuits & Crackers','biscuits-crackers','B',10),
  ('agriculture-food','Wafers','wafers','W',20),
  ('agriculture-food','Cakes & Cookies','cakes-cookies','CK',30),
  ('agriculture-food','Chocolate & Confectionery','chocolate-confectionery','CH',40),
  ('agriculture-food','Candy, Toffee & Gummies','candy-toffee-gummies','CG',50),
  ('agriculture-food','Snacks & Chips','snacks-chips','SN',60),
  ('agriculture-food','Tomato Paste','tomato-paste','TP',70),
  ('agriculture-food','Sauces & Condiments','sauces-condiments','SC',80),
  ('agriculture-food','Canned Foods','canned-foods','CF',90),
  ('agriculture-food','Pickles & Olives','pickles-olives','PK',100),
  ('agriculture-food','Pasta & Noodles','pasta-noodles','PA',110),
  ('agriculture-food','Jams, Honey & Spreads','jams-honey-spreads','JM',120),
  ('agriculture-food','Nuts & Dried Fruits','nuts-dried-fruits','ND',130),
  ('agriculture-food','Saffron & Spices','saffron-spices','SP',140),
  ('agriculture-food','Rice, Grains & Pulses','rice-grains-pulses','RG',150),

  ('beverage','Fruit Juices & Nectars','fruit-juices-nectars','JU',10),
  ('beverage','Malt & Non-Alcoholic Beverages','malt-non-alcoholic-beverages','NB',20),
  ('beverage','Soft Drinks & Energy Drinks','soft-drinks-energy-drinks','SD',30),
  ('beverage','Tea & Herbal Infusions','tea-herbal-infusions','TE',40),
  ('beverage','Coffee','coffee','CO',50),
  ('beverage','Syrups & Concentrates','syrups-concentrates','SY',60),
  ('beverage','Water & Functional Beverages','water-functional-beverages','WB',70),

  ('personal-care','Hair Care','hair-care','HC',10),
  ('personal-care','Skin Care','skin-care','SK',20),
  ('personal-care','Bath & Body','bath-body','BB',30),
  ('personal-care','Hand & Personal Hygiene','hand-personal-hygiene','HY',40),
  ('personal-care','Oral Care','oral-care','OC',50),
  ('personal-care','Baby Care','baby-care','BC',60),
  ('personal-care','Feminine Care','feminine-care','FC',70),

  ('home-care','Laundry Care','laundry-care','LC',10),
  ('home-care','Dishwashing','dishwashing','DW',20),
  ('home-care','Surface & Floor Cleaners','surface-floor-cleaners','CL',30),
  ('home-care','Bleach & Disinfectants','bleach-disinfectants','BD',40),
  ('home-care','Bathroom & Toilet Cleaners','bathroom-toilet-cleaners','BT',50),
  ('home-care','Air Fresheners','air-fresheners','AF',60),

  ('textile-apparel','T-Shirts','t-shirts','TS',10),
  ('textile-apparel','Trousers & Pants','trousers-pants','TR',20),
  ('textile-apparel','Socks','socks','SO',30),
  ('textile-apparel','Caps & Hats','caps-hats','CP',40),
  ('textile-apparel','Towels','towels','TW',50),
  ('textile-apparel','Bed Sheets','bed-sheets','BS',60)
)
insert into public.categories(parent_id,name,slug,code_prefix,sort_order)
select c.id,s.name,s.slug,s.code_prefix,s.sort_order
from subs s join c on c.slug=s.parent_slug;

select p.name as main_category, c.name as subcategory, c.code_prefix
from public.categories c
join public.categories p on p.id=c.parent_id
order by p.sort_order,c.sort_order;
