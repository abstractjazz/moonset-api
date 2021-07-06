class Project < ApplicationRecord
    has_many :likes 
    validates :title, presence: true, uniqueness: true
end
