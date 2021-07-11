class Project < ApplicationRecord
    has_many :notes
    validates :title, presence: true, uniqueness: true
end
