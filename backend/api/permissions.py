from rest_framework.permissions import BasePermission

class IsAdminOrSpecificUser(BasePermission):
    """
    permite que apenas usuarios do tipo admin 
    ou o usuario detentor dos dados possa acessar o recurso
    """
    def has_object_permission(self, request, obj):
        if request.user.role == 'ADMIN':
            return True
        return request.user.id == obj.id