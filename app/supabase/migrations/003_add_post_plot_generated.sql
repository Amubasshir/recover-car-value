-- If diminished_car_value already exists without post_plot_generated, run this:
ALTER TABLE diminished_car_value
ADD COLUMN IF NOT EXISTS post_plot_generated BOOLEAN DEFAULT true;
