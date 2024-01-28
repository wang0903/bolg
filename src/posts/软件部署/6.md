---
icon: pen-to-square
date: 2024-01-20
category:
  - Prometheus
tag:
  - Prometheus
  - Linux
  - Alertmanager
  - grafana
star: true
sticky: true #标记
---

# Prometheus、Alertmanager、grafana部署

### 创建docker-compose.yaml文件,安装三个软件

```yaml
version: '3.3'

volumes:
  prometheus_data: {}
  grafana_data: {}

networks:
  monitoring:
    driver: bridge

services:
  # 数据收集
  prometheus:
    image: prom/prometheus:v2.47.0
    container_name: prometheus
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./prometheus/:/etc/prometheus/
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
      - '--web.enable-lifecycle'  # 热加载配置
      # - '--web.enable-admin-api'  # api配置
      - '--storage.tsdb.retention.time=30d'  # 历史数据最大保留时间，默认15天
    networks:
      - monitoring
    links:
      - alertmanager
      - cadvisor
      - node_exporter
    expose:
      - '9090'
    ports:
      - '9090:9090'
    depends_on:
      - cadvisor

  # 告警软件
  alertmanager:
    image: prom/alertmanager:v0.26.0
    container_name: alertmanager
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ./alertmanager/:/etc/alertmanager/
    command:
      - '--config.file=/etc/alertmanager/config.yml'
      - '--storage.path=/alertmanager'
    networks:
      - monitoring
    expose:
      - '9093'
    ports:
      - '9093:9093'

  # 容器收集
  cadvisor:
    image: linuxkit/cadvisor:6ae4b50f8279692c459bccd0003066d22bd558ce
    container_name: cadvisor
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring
    expose:
      - '8080'

  # liux收集
  node_exporter:
    image: prom/node-exporter:v1.6.0
    container_name: node-exporter
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc|rootfs/var/lib/docker)($$|/)'
    networks:
      - monitoring
    ports:
      - '9100:9100'

  # 图表展示
  grafana:
    image: grafana/grafana:10.1.2
    container_name: grafana
    restart: always
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning/:/etc/grafana/provisioning/
    env_file:
      - ./grafana/config.monitoring
    networks:
      - monitoring
    links:
      - prometheus
    ports:
      - '3000:3000'
    depends_on:
      - prometheus

```
### prometheus 配置
```yaml
# 全局配置
global:
  scrape_interval:     15s # 将搜刮间隔设置为每15秒一次。默认是每1分钟一次。
  evaluation_interval: 15s # 每15秒评估一次规则。默认是每1分钟一次。

# Alertmanager 配置
alerting:
  alertmanagers:
  - static_configs:
    - targets: ['alertmanager:9093']

# 报警(触发器)配置
rule_files:
  - "alert.yml"
  - "node-exporter.yml"
  - "jvm-exporter.yml"
  - "mysql-exporter.yml"
  - "cadvisor-exporter.yml"

# 搜刮配置，接收各个客户端传过来的信息
scrape_configs:
  - job_name: 'prometheus'
    # 覆盖全局默认值，每15秒从该作业中刮取一次目标
    scrape_interval: 15s
    static_configs:
    - targets: ['localhost:9090']
  - job_name: 'alertmanager'
    scrape_interval: 15s
    static_configs:
    - targets: ['alertmanager:9093']
  - job_name: 'cadvisor'
    scrape_interval: 15s
    static_configs:
    - targets: ['cadvisor:8080']
      labels:
        instance: Prometheus服务器
    - targets: [ '192.168.1.2:8088' ]
      labels:
        instance: jenkins服务器
    - targets: [ '192.168.1.3:8088' ]
      labels:
        instance: minio服务器
    - targets: [ '192.168.1.4:8088' ]
      labels:
        instance: gitlab服务器
    - targets: [ '192.168.1.5:8088' ]
      labels:
        instance: mysql服务器
    - targets: [ '192.168.1.6:8088' ]
      labels:
        instance: server服务器
    - targets: [ '192.168.1.7:8088' ]
      labels:
        instance: sonarQubeHarbor服务器
    - targets: [ '192.168.1.8:8088' ]
      labels:
        instance: web服务器
    - targets: [ '192.168.1.9:8088' ]
      labels:
        instance: app服务器
    - targets: [ '192.168.1.10:8088' ]
      labels:
        instance: milian服务器
    - targets: [ '192.168.1.11:8088' ]
      labels:
        instance: vpn服务器

  - job_name: 'node-exporter'
    scrape_interval: 15s
    static_configs:
    - targets: ['node_exporter:9100']
      labels:
        instance: Prometheus服务器
    - targets: [ '192.168.1.12:9100' ]
      labels:
        instance: jenkins服务器
    - targets: [ '192.168.1.13:9100' ]
      labels:
        instance: server服务器
    - targets: [ '192.168.1.14:9100' ]
      labels:
        instance: web服务器
    - targets: [ '192.168.1.15:9100' ]
      labels:
        instance: minio服务器
    - targets: [ '192.168.1.16:9100' ]
      labels:
        instance: mysql服务器
    - targets: [ '192.168.1.17:9100' ]
      labels:
        instance: sonarQubeHarbor服务器
    - targets: [ '192.168.1.18:9100' ]
      labels:
        instance: app服务器
    - targets: [ '192.168.1.19:9100' ]
      labels:
        instance: milian服务器
    - targets: [ '192.168.1.20:9100' ]
      labels:
        instance: gitlab服务器
  - job_name: 'mysql-exporter'
    scrape_interval: 15s
    static_configs:
    - targets: ['192.168.1.21:9104']
      labels:
        instance: mysql
  - job_name: 'redis-exporter'
    scrape_interval: 15s
    static_configs:
      - targets: [ '192.168.1.22:9121' ]
        labels:
          instance: redis
  - job_name: 'server'
    scrape_interval: 15s
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['192.168.1.23:48080']
        labels:
          instance: jvm
  - job_name: 'filesystem-exporter'
    scrape_interval: 15s
    static_configs:
      - targets: [ '192.168.1.24:9100' ]
        labels:
          instance: 共享文件服务器


```
### alertmanager 配置
```yaml
global:
  #163服务器
  smtp_smarthost: 'smtp.163.com:465'
  #发邮件的邮箱
  smtp_from: ''
  #发邮件的邮箱用户名，也就是你的邮箱　　　　　
  smtp_auth_username: ''
  #发邮件的邮箱密码
  smtp_auth_password: ''
  #进行tls验证
  smtp_require_tls: false

route:
  group_by: ['alertname']
  # 当收到告警的时候，等待group_wait配置的时间，看是否还有告警，如果有就一起发出去
  group_wait: 10s
  #  如果上次告警信息发送成功，此时又来了一个新的告警数据，则需要等待group_interval配置的时间才可以发送出去
  group_interval: 10s
  # 如果上次告警信息发送成功，且问题没有解决，则等待 repeat_interval配置的时间再次发送告警数据
  repeat_interval: 10m
  # 全局报警组，这个参数是必选的
  receiver: dingtalk

receivers:
- name: 'email'
  #收邮件的邮箱
  email_configs:
  - to: 'xxxxx@xxxxxx.com'
    send_resolved: true
- name: 'dingtalk'
  #钉钉报警配置
  webhook_configs:
  - url: 'http://192.168.1.2:8060/dingtalk/webhook/send'
    send_resolved: true
inhibit_rules:
 - source_match:
     severity: 'critical'
   target_match:
     severity: 'warning'
   equal: ['alertname', 'dev', 'instance']

```
### 配置grafana登录密码
```editorconfig
 GF_SECURITY_ADMIN_PASSWORD=123456
 GF_USERS_ALLOW_SIGN_UP=false
```
### 安装钉钉提醒
```yaml
version: '3'
services:
  webhook:
    image: timonwong/prometheus-webhook-dingtalk:latest
    container_name: prometheus-webhook-dingtalk
    restart: "always"
    ports:
      - '8060:8060'
    command:
      - '--config.file=/etc/prometheus-webhook-dingtalk/config.yml'
    volumes:
      - ./config.yml:/etc/prometheus-webhook-dingtalk/config.yml
      - /etc/localtime:/etc/localtime:ro
```
#### 配置连接钉钉机器人
```yaml
targets:
  webhook:
    url: #这里填写地址
    secret: #这里填写加签
```
