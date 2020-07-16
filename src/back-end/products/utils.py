import random 
import string
import re

def gen_product_id(chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(7))

def get_range_digits(string):
    temp = re.findall(r'\d+', string)
    res = list(map(int, temp))

    return res