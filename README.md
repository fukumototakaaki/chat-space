# chat-space DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|

### Association

- has_many :messages
- has_many :groups, through: :groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|
|member|text||

### Association

- has_many :users, through: :groups_users
- has_many :messages, hrough: :groups_messages


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :user
- has_many :groups, hrough: :groups_messages


## groups_messagesテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :message