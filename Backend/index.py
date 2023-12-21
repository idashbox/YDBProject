import ydb

from art_reader import reader
from dbclient import ydb_client
from serialize import to_json_array
from exception import ConnectionFailure

import json

pool = ydb.SessionPool(ydb_client.create_driver())

def bad_request(code: int = 400, body = None):
  return { 
    'statusCode': code,
    'body': body
  }

def usual_responce(result):
  return { 
    'statusCode': 200,
    'body': to_json_array(result[0].rows)
  }

def art_get_request(parameters):
  if parameters['data'] == 'art_list':
    return usual_responce(pool.retry_operation_sync(reader.select_all_arts))
  elif parameters['data'] == 'art_autors_list':
    return usual_responce(pool.retry_operation_sync(reader.select_all_autors))
  elif parameters['data'] == 'art_autors_list_art':
    reader.name_set('Ivanov')
    return usual_responce(pool.retry_operation_sync(reader.select_all_autors_arts))
  else:
    return bad_request('Incorrect query parameters')

def handler(event, context):
  if(event['httpMethod'] == 'GET'):
    return art_get_request(event['queryStringParameters'])
  else:
    return bad_request()
  return {
    'statusCode': 200
  }