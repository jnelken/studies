class ShortenedUrl < ActiveRecord::Base
 validates :submitter_id, presence: true
 validates :short_url, presence: true, uniqueness: true
 validates :long_url, prescence: true, uniqueness: true
end
