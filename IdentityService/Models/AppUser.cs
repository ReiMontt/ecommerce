using Microsoft.AspNetCore.Identity;

namespace IdentityService.Models;

public class AppUser : IdentityUser
{
    // Add custom fields like Better Auth does
    public string? FullName { get; set; }
}
