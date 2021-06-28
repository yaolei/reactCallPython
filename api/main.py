from psycopg2.extensions import SQL_IN
from pydantic.types import conset
import uvicorn
import psycopg2
import logging
from typing import Optional,Callable
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from connection import connect_to_db, close_db_connection

logger = logging.getLogger(__name__)

#create report data basic type
class Item(BaseModel):
    clientName: str
    coments: str
    detail_address: str
    goodsType: str
    phone: int
    sells_num: int
    user_address:dict
    #user_address: Any = Body(...) object
class ProItem(BaseModel):
    price: str
    productname: str
    repertory: str
    province:str
    stock: str

class StockItem(BaseModel):
    cityId: str
    prId: str

class GoodsItem(BaseModel):
    name: str

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def inter_order_datas(datas, user_id):
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** insert order data **** ---")
    sql = "insert into user_order (CLIENTNAME, CLIENTID, COMENTS, GOODSTYPE, PHONE, SELLSNUM, PROVINCE,CITY, CITYAREA, STREET, DETAILADDRESS) \
                    values (%s, '%s',%s, %s, '%s', '%s', %s, %s, %s, %s, %s) RETURNING id"
    params = (datas.clientName, user_id, datas.coments, datas.goodsType, datas.phone, datas.sells_num, datas.user_address['province'][0], datas.user_address['province'][1], datas.user_address['province'][2],datas.user_address['street'], datas.detail_address) 
    cursor.execute(sql, params)
    order_id = cursor.fetchone()
    conn.commit()
    await close_db_connection(conn, cursor)
    logger.warn("--- **** end insert order data **** ---")
    return order_id[0]

#creat a new user
async def inter_new_user(datas):
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** insert one user data **** ---")
    sql = "insert into users (name, PHONE, PROVINCE, CITY, CITYAREA, detailaddress, sfc_role) \
             values(%s, '%s', %s, %s, %s, %s, %s) RETURNING id"
    params = (datas.clientName, datas.phone, datas.user_address['province'][0], datas.user_address['province'][1], datas.user_address['province'][2], datas.detail_address, '10')      
    cursor.execute(sql, params)
    user_id = cursor.fetchone()
    conn.commit()
    await close_db_connection(conn, cursor)
    logger.warn("--- **** end insert one user data **** ---")

    return user_id[0]
#inter a new project 

async def inter_new_pro(datas):
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** insert one user data **** ---")
    sql = "insert into product (productname, repertory, province, stock, price) \
             values(%s, %s, %s, %s, %s) RETURNING id"
    params = (datas.productname, datas.repertory, datas.province,datas.stock, datas.price)      
    cursor.execute(sql, params)
    pro_id = cursor.fetchone()
    conn.commit()
    await close_db_connection(conn, cursor)
    logger.warn("--- **** end insert one pro data **** ---")
    return pro_id[0]

# add new goods
async def inter_new_goods(datas):
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** insert one goods data **** ---")
    sql = "insert into goods_list (name) values('"+ datas.name+"') RETURNING id"
    print(sql)
    print(datas.name)
    # params = (datas.name)      
    # cursor.execute(sql, params)
    cursor.execute(sql)
    good_id = cursor.fetchone()
    conn.commit()
    await close_db_connection(conn, cursor)
    logger.warn("--- **** end insert goods data **** ---")
    return good_id[0]
    

async def inter_new_stockcity(datas):
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** insert new stock data **** ---")
    sql = "insert into stock_site (city, province) \
             values(%s, %s) RETURNING city"
    params = (datas.cityId, datas.prId)      
    cursor.execute(sql, params)
    city_id = cursor.fetchone()
    conn.commit()
    await close_db_connection(conn, cursor)
    logger.warn("--- **** end insert new stock data **** ---")
    return city_id[0]


async def check_exist_user(username, phone, city):
    exist_user = ""
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** Start checking user exist **** ---")
    sql = "select id from users where deleted='false' and name = %s and phone='%s' and city=%s"
    # 查询条件参数结束必须加,
    params = (username, phone, city,)
    
    cursor.execute(sql, params)
    while True:
        data = cursor.fetchone()
        if data == None:
            logger.warn("--- **** end checking user  **** ---")
            break
        exist_user = data[0]
    conn.commit()
    await close_db_connection(conn, cursor)
    if exist_user == "":
        exist_user = False
    return exist_user

async def check_exist_goodsname(name):
    exist_goodsid =""
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** Start checking goods exist **** ---")
    sql = "select name from goods_list  where name=%s"
    params = (name, )
    print(sql)
    cursor.execute(sql, params)
    while True:
        data = cursor.fetchone()
        if data == None:
            logger.warn("--- **** end goods pro  **** ---")
            break
        exist_goodsid = data[0]
    conn.commit()
    await close_db_connection(conn, cursor)
    if exist_goodsid == "":
        exist_goodsid = False
    return exist_goodsid

async def check_exist_city(id):
    exist_cityid =""
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** Start checking project exist **** ---")
    sql = "select city from stock_site  where city=%s and deleted='false'"
    params = (id, )
    print(sql)
    cursor.execute(sql, params)
    while True:
        data = cursor.fetchone()
        if data == None:
            logger.warn("--- **** end stock   **** ---")
            break
        exist_cityid = data[0]
    conn.commit()
    await close_db_connection(conn, cursor)
    if exist_cityid == "":
        exist_cityid = False
    return exist_cityid 

#get order list datas
async def get_stocks_list():
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** Start get stock site city list **** ---")
    sql = "select id, province , city ,deleted FROM stock_site "
    cursor.execute(sql)
    data = cursor.fetchall()
    conn.commit()
    await close_db_connection(conn, cursor)
    return data

#get product list datas
async def get_productdetial_list():
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** Start get product  list **** ---")
    sql = "select gl.name as productname, p.repertory, p.province, p.stock, p.price  FROM product p \
          left join goods_list gl on  cast(gl.id as  character varying)  = p.productname "
    # sql = "select productname , repertory, province, stock, price  FROM product where deleted = 'false'"
    cursor.execute(sql)
    data = cursor.fetchall()
    conn.commit()
    logger.warn("--- **** get product end **** ---")
    await close_db_connection(conn, cursor)
    return data

#get goods list datas
async def get_progoods_list():
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** Start get stock site city list **** ---")
    sql = "select id, name , createdata FROM goods_list where deleted ='false' "
    cursor.execute(sql)
    data = cursor.fetchall()
    conn.commit()
    await close_db_connection(conn, cursor)
    return data

#get stock list datas
async def getOrder():
    conn = await connect_to_db()
    cursor = conn.cursor()
    logger.warn("--- **** DB connect success **** ---")
    logger.warn("--- **** Start get user order list **** ---")
    sql = "select  uo.clientid , uo.clientname ,uo.phone ,p.productname , uo.sellsnum, uo.detailaddress , uo.province , \
           uo.city, uo.status, u.is_members, uo.coments, uo.createdata from user_order uo \
           left join users u  on cast(u.id as  character varying) = uo.clientid \
           left join product p on uo.goodstype = p.id   where u.deleted ='false' \
           order by uo.createdata desc "
    cursor.execute(sql)
    data = cursor.fetchall()
    conn.commit()
    await close_db_connection(conn, cursor)
    return data

@app.get("/")
def read_root():
    return {"Hello": "World1"}

@app.get("/createdaily-report")
def test_root():
    return {"Hello": "Evan"}

@app.get("/getOrderDatas")
async def get_order_list():
    datas = await getOrder()
    return (datas)

@app.get("/getSiteDatas")
async def get_stock_list():
    datas = await get_stocks_list()
    return (datas)

@app.get("/productDatas")
async def get_products_list():
    datas = await get_productdetial_list()
    return (datas)

@app.get("/getGoodsDatas")
async def get_goods_list():
    datas = await get_progoods_list()
    return (datas)


#new stock
@app.post("/addnewStock")
async def submit_add_stock(request_data: StockItem):
        city_id = await check_exist_city(request_data.cityId)
        if city_id == False:
            # no exist pro id , add new project
            cityid = await inter_new_stockcity(request_data)
        else:
            cityid = False
            logger.warn("--- **** pro is exist !!  **** ---")
        return (cityid)

@app.post("/submitProjects")
async def submit_new_project(request_data: ProItem):
        proid = await inter_new_pro(request_data)
        # pro_id = await check_exist_proId(request_data.id)
        # if pro_id == False:
        #     # no exist pro id , add new project
        #     proid = await inter_new_pro(request_data)
        # else:
        #     proid = False
        #     logger.warn("--- **** pro is exist !!  **** ---")
        return (proid)

@app.post("/addnewGoods")
async def submit_new_goods(request_data: GoodsItem):
        goods_id = await check_exist_goodsname(request_data.name)
        if goods_id == False:
            # no exist pro id , add new project
            goodsid = await inter_new_goods(request_data)
        else:
            goodsid = False
            logger.warn("--- **** pro is exist !!  **** ---")
        
        return (goodsid)

@app.post("/submitReport")
async def send_reportData(request_data: Item):
        #sumbit the order data
        # 1 check if the user exist in data base if not create one
        user_id = await check_exist_user(request_data.clientName, request_data.phone, request_data.user_address['province'][1])
        if user_id == False:
           #insert a new user data if this is new user
           userid = await inter_new_user(request_data)
        else:
            userid = user_id
            logger.warn("--- **** User is exist !!  **** ---")
        await inter_order_datas(request_data, userid)
        # conn = await connect_to_db()
        # cursor = conn.cursor()
        # sql = inter_data(request_data)
        # params = (request_data.clientName, request_data.coments, request_data.detail_address, request_data.goodsType, request_data.phone, request_data.prefix, request_data.sells_num, request_data.user_address['province'][0], request_data.user_address['province'][1], request_data.user_address['province'][2])
        # cursor.execute(sql, params)
        # conn.commit()
        # await close_db_connection(conn, cursor)
        return (userid)

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

if __name__ == '__main__':
    uvicorn.run(app='main:app', host="0.0.0.0", port=8000, reload=True, debug=True)