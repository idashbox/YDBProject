import os
import ydb
import ydb.iam 

from typing import List
# ���������� ������ � ����������� �����
from config import ydb_configuration
# ���������� ���� ����������
from exception import ConnectionFailure

class YDBClient:
    # �����������, ��������� ������ �������
    def __init__(self) -> None:
        self.config = ydb_configuration
        self.driver = self.create_driver()

    # �������� �������� �� ���������� �����������
    def create_driver(self) -> ydb.Driver:
        # ������� ������ ����������� �� ���������� �����
        # � �������� ������ ���������� ������������
        driver_config = ydb.DriverConfig(
            self.config.endpoint,
            self.config.database,
            credentials=ydb.iam.MetadataUrlCredentials(),
            root_certificates=ydb.load_ydb_root_certificate(),
        )
        self.driver = ydb.Driver(driver_config)
        try:
            self.driver.wait(fail_fast=True, timeout=5)
        except Exception:
            raise ConnectionFailure(self.driver.discovery_debug_details())
        return self.driver

    @property
    def table_client(self) -> ydb.TableClient:
        return self.driver.table_client

    def bulk_upsert(self, rows: List, column_types: ydb.BulkUpsertColumns):
        self.table_client.bulk_upsert(self.config.full_path, rows, column_types)

ydb_client = YDBClient()