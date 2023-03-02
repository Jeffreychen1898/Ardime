# Transformations
This is very simple method to transform 3d points.
```javascript
const my_point = [100, 100, 50];
const my_transformation = Ardime.Geometry.Transformation.newTransformation();

my_transformation = Ardime.Geometry.Transformation.translate(my_transformation, x, y, z);
my_transformation = Ardime.Geometry.Transformation.rotateX(my_transformation, x_angle);
my_transformation = Ardime.Geometry.Transformation.rotateY(my_transformation, y_angle);
my_transformation = Ardime.Geometry.Transformation.rotateZ(my_transformation, z_angle);

my_point = Ardime.Geometry.Transformation.applyTransformation(my_transformation, my_point);
```