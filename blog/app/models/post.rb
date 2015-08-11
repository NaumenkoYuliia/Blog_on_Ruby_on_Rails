class Post < ActiveRecord::Base
	has_many :comments
	validates_presence_of :body, :title, :author, :category

  def self.featured
    find_by_id where(featured: true).pluck(:id).sample
  end
end
