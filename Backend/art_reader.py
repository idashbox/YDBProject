import ydb

def blocking_query(session, query):
  return session.transaction().execute(
    query,
    commit_tx = True,
    settings = ydb.BaseRequestSettings().with_timeout(3).with_operation_timeout(2)
  )

class Art_reader:
    def __init__(self):
      self.name = ""
    def name_set(self, name):
      self.name = name

    def select_all_arts(self, session):
      query = '''SELECT auto.id_autor as id, auto.name as name_autor, coalesce(pic.name, 'Unknown') as pic_name, 
    FROM pictires pic LEFT JOIN autors auto ON auto.id_autor = pic.id_autor;''';
      return blocking_query(session, query)

    def select_all_autors(self, session):
      query = '''SELECT name
    FROM autors;''';
      return blocking_query(session, query)

    def select_all_autors_arts(self, session):
      query = '''SELECT auto.id_autor as id, auto.name as name_autor, coalesce(pic.name, 'Unknown') as pic_name, 
    FROM pictires pic LEFT JOIN autors auto ON auto.id_autor = pic.id_autor
    WHERE auto.name = ''' + self.name + ''';''';
      return blocking_query(session, query)

        
reader = Art_reader()